import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Radio, 
  Tv, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Play, 
  Pause, 
  Users, 
  MessageSquare, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award, 
  Flame, 
  Share2, 
  RefreshCw, 
  AlertCircle,
  Video,
  Eye,
  ExternalLink,
  ChevronRight,
  Heart,
  Smile,
  Camera,
  CameraOff,
  FlipHorizontal,
  SwitchCamera,
  Download,
  X,
  Sliders,
  Settings
} from 'lucide-react';
import { Participant, SystemConfig } from '../../types';
import { OFFICIAL_BRANCHES } from '../../data/mtqBranches';
import { LOGO_MTQ_NATIONAL, LOGO_LOMBOK_BARAT } from '../../assets/logo';
import confetti from 'canvas-confetti';

interface LiveStreamingViewProps {
  participants: Participant[];
  config: SystemConfig;
  onNavigateToJudging?: (participantId: string) => void;
  onNavigateToScoreboard?: () => void;
  onUpdateParticipantStatus?: (participantId: string, status: any) => void;
}

interface ChatMessage {
  id: string;
  sender: string;
  kafilah: string;
  text: string;
  timestamp: string;
  isOfficial?: boolean;
}

// Arenas list according to official MTQ stages in Gerung
export const MTQ_ARENAS = [
  { id: 'arena-utama', name: 'Mimbar Utama (Panggung Utama)', location: 'Lapangan Kantor Camat Gerung', icon: '🕌', activeBranchIds: ['tilawah', 'qiraat'], defaultVideoId: 'live_tilawah' },
  { id: 'arena-2', name: 'Gedung Serbaguna Gerung', location: 'Aula Serbaguna KUA & Camat Gerung', icon: '🏛️', activeBranchIds: ['hifzh', 'hadist'], defaultVideoId: 'live_tahfidz' },
  { id: 'arena-3', name: 'Aula Madrasah / Ponpes', location: 'Kompleks Pendidikan Keagamaan Gerung', icon: '📖', activeBranchIds: ['tafsir', 'makalah', 'khath'], defaultVideoId: 'live_khath' },
  { id: 'arena-4', name: 'Pentas Fahmil & Syarhil', location: 'Gedung Pemuda Gerung', icon: '🎤', activeBranchIds: ['fahmil', 'syarhil'], defaultVideoId: 'live_fahmil' }
];

export const LiveStreamingView: React.FC<LiveStreamingViewProps> = ({
  participants,
  config,
  onNavigateToJudging,
  onNavigateToScoreboard,
  onUpdateParticipantStatus
}) => {
  // Currently selected arena
  const [selectedArenaId, setSelectedArenaId] = useState<string>('arena-utama');
  
  // Audio & video controls
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [customStreamUrl, setCustomStreamUrl] = useState<string>('');
  const [isEditingStreamUrl, setIsEditingStreamUrl] = useState<boolean>(false);
  const [viewersCount, setViewersCount] = useState<number>(428);
  const [likesCount, setLikesCount] = useState<number>(852);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // Video Source: 'camera' (Webcam/Camcorder langsung) | 'stream' (YouTube/OBS) | 'virtual' (Panggung Virtual)
  const [videoSourceMode, setVideoSourceMode] = useState<'camera' | 'stream' | 'virtual'>('camera');
  
  // Live Camera states
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isCameraStarting, setIsCameraStarting] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user');
  const [isCameraMirrored, setIsCameraMirrored] = useState<boolean>(false);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [showLowerThird, setShowLowerThird] = useState<boolean>(true);
  const [isUsingSimulator, setIsUsingSimulator] = useState<boolean>(false);
  const [streamDuration, setStreamDuration] = useState<number>(0);
  const [snapshotImage, setSnapshotImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const durationTimerRef = useRef<any>(null);

  // Live chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'c-1',
      sender: 'Admin Panitia MTQ',
      kafilah: 'LPTQ Kec. Gerung',
      text: 'Ahlan wa Sahlan di Siaran Langsung MTQ Ke-XXXII Kecamatan Gerung!',
      timestamp: '10:00',
      isOfficial: true
    },
    {
      id: 'c-2',
      sender: 'Haji Mahsun',
      kafilah: 'Kafilah Desa Babussalam',
      text: 'Masya Allah suara qari sangat merdu dan khusyuk.',
      timestamp: '10:04'
    },
    {
      id: 'c-3',
      sender: 'Nurul Hidayati',
      kafilah: 'Kafilah Kelurahan Dasan Geres',
      text: 'Semangat untuk kafilah Dasan Geres! Semoga juara berkah.',
      timestamp: '10:07'
    },
    {
      id: 'c-4',
      sender: 'Ust. Zulkifli',
      kafilah: 'Kafilah Desa Beleka',
      text: 'Alhamdulillah, tajwid dan lagu bayatinya tertata rapi.',
      timestamp: '10:12'
    }
  ]);
  const [inputChat, setInputChat] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('Masyarakat / Penonton');
  const [senderKafilah, setSenderKafilah] = useState<string>('Kafilah Desa/Kelurahan');

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const activeArena = MTQ_ARENAS.find(a => a.id === selectedArenaId) || MTQ_ARENAS[0];

  // Filter participants for this arena
  const arenaParticipants = useMemo(() => {
    return participants.filter(p => activeArena.activeBranchIds.includes(p.branchId));
  }, [participants, activeArena]);

  // Current active performing participant in this arena
  const performingParticipant = useMemo(() => {
    const active = arenaParticipants.find(p => p.status === 'SEDANG_TAMPIL');
    if (active) return active;
    // Fallback: take next verified participant or first participant
    return arenaParticipants.find(p => p.status === 'TERVERIFIKASI') || arenaParticipants[0];
  }, [arenaParticipants]);

  // Upcoming participants queue
  const upcomingQueue = useMemo(() => {
    return arenaParticipants
      .filter(p => p.id !== performingParticipant?.id && p.status !== 'SELESAI')
      .sort((a, b) => a.orderNumber - b.orderNumber);
  }, [arenaParticipants, performingParticipant]);

  // Recently finished in this arena
  const finishedList = useMemo(() => {
    return arenaParticipants
      .filter(p => p.status === 'SELESAI')
      .sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));
  }, [arenaParticipants]);

  // Simulated live viewers counter fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewersCount(prev => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(120, prev + delta);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        console.error("Fullscreen error:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.error(err));
      setIsFullscreen(false);
    }
  };

  // Send a chat comment
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newMsg: ChatMessage = {
      id: `c-${Date.now()}`,
      sender: senderName.trim() || 'Warga Gerung',
      kafilah: senderKafilah.trim() || 'Kafilah Gerung',
      text: inputChat.trim(),
      timestamp: timeStr
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputChat('');
  };

  // Give like & celebratory confetti
  const handleLike = () => {
    setLikesCount(prev => prev + 1);
    setHasLiked(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  // Participant branch details
  const currentBranch = OFFICIAL_BRANCHES.find(b => b.id === performingParticipant?.branchId);

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SEDANG_TAMPIL':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white animate-pulse shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            SEDANG TAMPIL (LIVE)
          </span>
        );
      case 'TERVERIFIKASI':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 text-blue-600" />
            Siap Tampil Berikutnya
          </span>
        );
      case 'SELESAI':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Telah Tampil
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            Terdaftar
          </span>
        );
    }
  };

  // Start Camera
  const startCamera = async (deviceId?: string, facing?: 'user' | 'environment') => {
    setIsCameraStarting(true);
    setCameraError(null);
    setIsUsingSimulator(false);

    // Stop existing tracks if any
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => track.stop());
      cameraStreamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Fitur kamera tidak didukung pada peramban ini atau memerlukan koneksi HTTPS.');
      }

      const targetFacing = facing || cameraFacingMode;
      let stream: MediaStream | null = null;

      // Tier 1: Try with requested constraints (video + audio if available)
      try {
        const constraints: MediaStreamConstraints = {
          video: deviceId 
            ? { deviceId: { exact: deviceId } }
            : { facingMode: targetFacing, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (tier1Err: any) {
        console.warn('Tier 1 camera init failed, attempting video-only constraint:', tier1Err);
        // Tier 2: Video-only with relaxed resolution (avoids audio permission blockers)
        try {
          const videoOnlyConstraints: MediaStreamConstraints = {
            video: deviceId 
              ? { deviceId: { exact: deviceId } }
              : { facingMode: targetFacing }
          };
          stream = await navigator.mediaDevices.getUserMedia(videoOnlyConstraints);
        } catch (tier2Err: any) {
          console.warn('Tier 2 camera init failed, attempting universal basic { video: true } constraint:', tier2Err);
          // Tier 3: Universal minimal constraint { video: true } (fixes "Timeout starting video source" on PC webcams)
          const universalConstraints: MediaStreamConstraints = {
            video: true
          };
          stream = await navigator.mediaDevices.getUserMedia(universalConstraints);
        }
      }

      if (!stream) {
        throw new Error('Tidak dapat memperoleh aliran video dari perangkat.');
      }

      cameraStreamRef.current = stream;
      setIsCameraActive(true);
      setVideoSourceMode('camera');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.log('Video play caught:', e));
      }

      // Enumerate camera devices
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(d => d.kind === 'videoinput');
        setAvailableCameras(videoInputs);
        if (deviceId) {
          setSelectedCameraId(deviceId);
        } else if (videoInputs.length > 0 && !selectedCameraId) {
          setSelectedCameraId(videoInputs[0].deviceId);
        }
      } catch (enumErr) {
        console.log('Error enumerating devices:', enumErr);
      }

      // Start duration counter
      setStreamDuration(0);
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
      durationTimerRef.current = setInterval(() => {
        setStreamDuration(prev => prev + 1);
      }, 1000);

    } catch (err: any) {
      console.error('Camera access error:', err);
      const errMsg = err.message || '';
      const isDenied = err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError' || errMsg.toLowerCase().includes('permission denied');
      const isTimeout = err.name === 'AbortError' || errMsg.toLowerCase().includes('timeout');
      const isNotFound = err.name === 'NotFoundError' || err.name === 'devicesnotfounderror';
      const isOccupied = err.name === 'NotReadableError' || err.name === 'TrackStartError';

      setCameraError(
        isDenied
          ? 'Izin kamera ditolak oleh peramban. Silakan klik ikon gembok/kamera pada bilah alamat (address bar) browser Anda, aktifkan izin Kamera & Mikrofon, lalu coba lagi.'
          : isTimeout
          ? 'Waktu tunggu kamera habis (Timeout starting video source). Pastikan webcam PC terpasang dan tidak sedang dibuka oleh aplikasi lain (seperti Zoom, Teams, Skype, atau WhatsApp).'
          : isOccupied
          ? 'Kamera PC sedang digunakan oleh program lain. Tutup aplikasi yang menggunakan webcam dan klik coba lagi.'
          : isNotFound
          ? 'Perangkat webcam tidak terdeteksi pada PC ini. Pastikan kabel webcam terhubung.'
          : `Gagal mengakses kamera (${errMsg || 'Kesalahan perangkat'}). Anda juga dapat menggunakan tombol Simulator Feed di bawah.`
      );
      setIsCameraActive(false);
    } finally {
      setIsCameraStarting(false);
    }
  };

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(t => t.stop());
      cameraStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }
    setIsCameraActive(false);
    setIsUsingSimulator(false);
  };

  const switchCameraFacing = () => {
    const nextFacing = cameraFacingMode === 'user' ? 'environment' : 'user';
    setCameraFacingMode(nextFacing);
    if (isCameraActive) {
      startCamera(undefined, nextFacing);
    }
  };

  const handleDeviceChange = (deviceId: string) => {
    setSelectedCameraId(deviceId);
    if (isCameraActive) {
      startCamera(deviceId);
    }
  };

  const toggleMic = () => {
    if (cameraStreamRef.current) {
      const audioTracks = cameraStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMicMuted;
      });
    }
    setIsMicMuted(!isMicMuted);
  };

  const startSimulator = () => {
    stopCamera();
    setIsUsingSimulator(true);
    setIsCameraActive(true);
    setCameraError(null);
    setVideoSourceMode('camera');
    setStreamDuration(0);
    if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    durationTimerRef.current = setInterval(() => {
      setStreamDuration(prev => prev + 1);
    }, 1000);
  };

  const captureSnapshot = () => {
    const canvas = document.createElement('canvas');
    const width = videoRef.current?.videoWidth || 1280;
    const height = videoRef.current?.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (videoRef.current && isCameraActive && !isUsingSimulator) {
        if (isCameraMirrored) {
          ctx.translate(width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(videoRef.current, 0, 0, width, height);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          ctx.drawImage(videoRef.current, 0, 0, width, height);
        }
      } else {
        // High quality background gradient for snapshot in simulator
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#064e3b');
        grad.addColorStop(0.5, '#042f2e');
        grad.addColorStop(1, '#022c22');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw TV Broadcast Lower-Third Overlay on snapshot if enabled
      if (showLowerThird && performingParticipant) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
        ctx.fillRect(40, height - 160, width - 80, 120);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, height - 160, width - 80, 120);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText(performingParticipant.fullName, 70, height - 105);

        ctx.fillStyle = '#6ee7b7';
        ctx.font = '20px sans-serif';
        ctx.fillText(`${performingParticipant.originKafilah} • ${currentBranch?.name || ''} (${performingParticipant.category}) • No. Undian #${performingParticipant.orderNumber}`, 70, height - 65);
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setSnapshotImage(dataUrl);
    }
  };

  const formatDuration = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach(t => t.stop());
      }
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
    };
  }, []);

  // Helper to extract embeddable YouTube URL if user pastes a standard watch URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const vidId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${vidId}?autoplay=1&mute=0`;
    }
    if (url.includes('youtu.be/')) {
      const vidId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${vidId}?autoplay=1&mute=0`;
    }
    return url;
  };

  const effectiveStreamUrl = customStreamUrl || performingParticipant?.streamUrl;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-amber-400 bg-white p-1 flex items-center justify-center shadow-sm relative" title="Pemerintah Kabupaten Lombok Barat">
              <img
                src={LOGO_LOMBOK_BARAT}
                alt="Logo Kabupaten Lombok Barat"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-rose-500 bg-rose-50 p-1 flex items-center justify-center shadow-sm relative" title="LPTQ / MTQ Nasional">
              <img
                src={LOGO_MTQ_NATIONAL}
                alt="Logo MTQ Nasional"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600 text-[9px] font-bold text-white items-center justify-center">●</span>
              </span>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 mb-1.5">
              <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              Siaran Langsung Resmi MTQ Kecamatan Gerung
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Live Streaming Arena & Peserta Tampil
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Pantau langsung penampilan Qari, Hafizh, dan Kafilah dari 11 Desa & 3 Kelurahan se-Kecamatan Gerung secara real-time.
            </p>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {onNavigateToScoreboard && (
            <button
              onClick={onNavigateToScoreboard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition"
            >
              <Award className="w-4 h-4" />
              Papan Skor Real-Time
            </button>
          )}

          <button
            onClick={() => {
              setVideoSourceMode('camera');
              if (!isCameraActive) {
                startCamera();
              }
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition ${
              videoSourceMode === 'camera' && isCameraActive
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200'
            }`}
          >
            <Camera className="w-4 h-4 text-rose-600" />
            {isCameraActive ? 'Kamera Live Aktif' : 'Nyalakan Kamera Live'}
          </button>

          <button
            onClick={() => setIsEditingStreamUrl(!isEditingStreamUrl)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
            title="Ganti tautan streaming YouTube/OBS"
          >
            <Tv className="w-4 h-4 text-slate-600" />
            {isEditingStreamUrl ? 'Tutup URL' : 'Atur URL Video/OBS'}
          </button>
        </div>
      </div>

      {/* URL Customizer Accordion */}
      {isEditingStreamUrl && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Video className="w-4 h-4 text-amber-700" />
            Koneksi Sumber Live Streaming (YouTube Live, Facebook Live, atau RTMP/HLS)
          </div>
          <p className="text-xs text-amber-800">
            Masukkan tautan URL YouTube Live atau link video embed kamera panggung arena untuk ditampilkan di layar streaming. Anda juga dapat beralih ke mode Kamera Langsung Perangkat untuk menggunakan webcam/kamera laptop atau capture card panggung.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customStreamUrl}
              onChange={e => setCustomStreamUrl(e.target.value)}
              placeholder="Contoh: https://www.youtube.com/watch?v=... atau https://www.youtube.com/embed/..."
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-slate-800"
            />
            <button
              type="button"
              onClick={() => {
                if (customStreamUrl) {
                  setVideoSourceMode('stream');
                  alert("Tautan video live streaming berhasil diterapkan ke panggung!");
                }
                setIsEditingStreamUrl(false);
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-sm transition"
            >
              Terapkan URL
            </button>
            {customStreamUrl && (
              <button
                type="button"
                onClick={() => {
                  setCustomStreamUrl('');
                  setVideoSourceMode('camera');
                }}
                className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold"
              >
                Kembali ke Kamera
              </button>
            )}
          </div>
        </div>
      )}

      {/* Arena Selector Tabs */}
      <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-200 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-rose-500" />
            Pilih Arena Panggung:
          </span>
          {MTQ_ARENAS.map(arena => {
            const isSelected = arena.id === selectedArenaId;
            return (
              <button
                key={arena.id}
                onClick={() => setSelectedArenaId(arena.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{arena.icon}</span>
                <span>{arena.name}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Source Switcher & Camera Controls Bar */}
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            Sumber Layar:
          </span>

          <button
            onClick={() => {
              setVideoSourceMode('camera');
              if (!isCameraActive) startCamera();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              videoSourceMode === 'camera'
                ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Kamera Langsung Arena</span>
            {isCameraActive && (
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => {
              setVideoSourceMode('stream');
              stopCamera();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              videoSourceMode === 'stream'
                ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Link YouTube / OBS RTMP</span>
          </button>

          <button
            onClick={() => {
              setVideoSourceMode('virtual');
              stopCamera();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              videoSourceMode === 'virtual'
                ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Panggung Virtual MTQ</span>
          </button>
        </div>

        {/* Camera-specific toolbar when in camera mode */}
        {videoSourceMode === 'camera' && (
          <div className="flex items-center gap-2 flex-wrap">
            {isCameraActive ? (
              <>
                {/* Device dropdown if multiple webcams */}
                {availableCameras.length > 1 && (
                  <select
                    value={selectedCameraId}
                    onChange={e => handleDeviceChange(e.target.value)}
                    className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 focus:ring-1 focus:ring-emerald-500"
                    title="Pilih perangkat kamera"
                  >
                    {availableCameras.map((d, i) => (
                      <option key={d.deviceId || i} value={d.deviceId}>
                        {d.label || `Kamera ${i + 1}`}
                      </option>
                    ))}
                  </select>
                )}

                {/* Flip camera / front-rear */}
                <button
                  onClick={switchCameraFacing}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition"
                  title="Ganti Kamera Depan/Belakang"
                >
                  <SwitchCamera className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Arah Kamera</span>
                </button>

                {/* Mirror Toggle */}
                <button
                  onClick={() => setIsCameraMirrored(!isCameraMirrored)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
                    isCameraMirrored ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title="Cermin Layar Kamera"
                >
                  <FlipHorizontal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cermin</span>
                </button>

                {/* Lower-Third Overlay Toggle */}
                <button
                  onClick={() => setShowLowerThird(!showLowerThird)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
                    showLowerThird ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title="Tampilkan / Sembunyikan Grafis Nama TV"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="hidden sm:inline">Grafis TV</span>
                </button>

                {/* Snapshot Capture */}
                <button
                  onClick={captureSnapshot}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition"
                  title="Ambil Tangkapan Layar Penampilan Peserta"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Foto Tampil</span>
                </button>

                {/* Stop Camera */}
                <button
                  onClick={stopCamera}
                  className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold transition flex items-center gap-1"
                >
                  <CameraOff className="w-3.5 h-3.5" />
                  <span>Matikan</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => startCamera()}
                disabled={isCameraStarting}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{isCameraStarting ? 'Menghubungkan...' : 'Nyalakan Kamera'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Grid: Video Player (Left 8 Cols) + Live Chat / Queue (Right 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* VIDEO PLAYER & STAGE */}
        <div className="lg:col-span-8 space-y-4">
          <div 
            ref={playerContainerRef}
            className="relative bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 aspect-video flex flex-col justify-between"
          >
            {/* 1. CAMERA MODE */}
            {videoSourceMode === 'camera' && (
              <>
                {isCameraActive && !isUsingSimulator ? (
                  <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted={isMicMuted}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        isCameraMirrored ? 'scale-x-[-1]' : ''
                      }`}
                    />
                  </div>
                ) : isUsingSimulator ? (
                  /* Simulator Mode with realistic HD Arena Feed visuals */
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-950 flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-15 flex items-center justify-center pointer-events-none">
                      <div className="w-96 h-96 border-[16px] border-amber-400 rounded-full rotate-45"></div>
                      <div className="w-96 h-96 border-[16px] border-emerald-400 rounded-full -rotate-45"></div>
                    </div>

                    <div className="relative z-10 max-w-xl mx-auto space-y-3">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-900/80 p-1.5 border-2 border-amber-400 shadow-2xl flex items-center justify-center" title="Pemerintah Kabupaten Lombok Barat">
                          <img
                            src={LOGO_LOMBOK_BARAT}
                            alt="Logo Lombok Barat"
                            className="w-full h-full object-contain drop-shadow"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-emerald-900/80 p-1.5 border-2 border-emerald-400 shadow-2xl flex items-center justify-center" title="LPTQ / MTQ Nasional">
                          <img
                            src={LOGO_MTQ_NATIONAL}
                            alt="Logo MTQ"
                            className="w-full h-full object-contain drop-shadow"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 bg-emerald-900/90 border border-emerald-700/80 px-3.5 py-1 rounded-full text-xs text-amber-300 font-semibold shadow">
                        <span>{activeArena.icon}</span>
                        <span>{activeArena.name}</span>
                        <span>•</span>
                        <span className="text-white">{activeArena.location}</span>
                      </div>

                      {performingParticipant ? (
                        <div className="space-y-2">
                          <div className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                            Sedang Tampil Di Mimbar Utama:
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-black text-amber-400 font-serif tracking-tight drop-shadow-md">
                            {performingParticipant.fullName}
                          </h3>
                          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-200">
                            <span className="bg-emerald-800/90 border border-emerald-600 px-2.5 py-1 rounded-lg">
                              No. Undian: <strong>{performingParticipant.orderNumber}</strong> ({performingParticipant.participantCode})
                            </span>
                            <span className="bg-emerald-800/90 border border-emerald-600 px-2.5 py-1 rounded-lg text-amber-300">
                              {performingParticipant.originKafilah}
                            </span>
                            <span className="bg-emerald-800/90 border border-emerald-600 px-2.5 py-1 rounded-lg">
                              {currentBranch?.name} ({performingParticipant.category})
                            </span>
                          </div>

                          {/* Sound Wave Animation Visualizer */}
                          <div className="flex items-center justify-center gap-1.5 pt-4">
                            {[40, 70, 30, 85, 100, 60, 45, 90, 65, 35, 75, 50, 80, 60].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-gradient-to-t from-emerald-400 to-amber-300 rounded-full animate-pulse"
                                style={{
                                  height: `${h * 0.35}px`,
                                  animationDuration: `${0.6 + (i % 5) * 0.2}s`,
                                  animationDelay: `${i * 0.05}s`
                                }}
                              ></div>
                            ))}
                          </div>
                          <div className="text-[11px] text-emerald-300 font-mono flex items-center justify-center gap-1.5 mt-2">
                            <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                            Audio Panggung & Mikrofon Mimbar Aktif
                          </div>
                        </div>
                      ) : (
                        <div className="py-6 text-slate-300 space-y-1">
                          <p className="text-base font-semibold">Tidak ada peserta yang sedang tampil saat ini.</p>
                          <p className="text-xs text-slate-400">Panggung bersiap untuk penampilan peserta berikutnya.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Inactive Camera State - Launcher Box */
                  <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border-2 border-rose-500/40 flex items-center justify-center shadow-2xl relative">
                      <Camera className="w-10 h-10 text-rose-500" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600"></span>
                      </span>
                    </div>
                    
                    <div className="max-w-md space-y-1.5">
                      <h3 className="text-xl font-extrabold text-white tracking-tight">
                        Kamera Siaran Langsung Arena
                      </h3>
                      <p className="text-xs text-slate-300">
                        Aktifkan kamera perangkat (webcam komputer, laptop, smartphone, atau capture card video panggung) untuk menyiarkan langsung penampilan qari/qariah di mimbar.
                      </p>
                    </div>

                    {cameraError && (
                      <div className="p-3 bg-rose-950/80 border border-rose-500/40 rounded-xl text-xs text-rose-200 max-w-md text-left flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <div className="font-bold text-rose-300">Akses Kamera Terkendala:</div>
                          <p className="text-[11px]">{cameraError}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => startCamera()}
                        disabled={isCameraStarting}
                        className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-900/40 flex items-center gap-2 transition"
                      >
                        <Camera className="w-4 h-4" />
                        {isCameraStarting ? 'Menghubungkan Kamera...' : 'Nyalakan Kamera Sekarang'}
                      </button>

                      <button
                        onClick={startSimulator}
                        className="px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-600/60 text-xs sm:text-sm font-semibold flex items-center gap-2 transition"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Coba Simulator Feed Kamera HD
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* 2. EXTERNAL STREAM URL MODE */}
            {videoSourceMode === 'stream' && (
              <div className="w-full h-full bg-black">
                {effectiveStreamUrl ? (
                  <iframe
                    src={getEmbedUrl(effectiveStreamUrl)}
                    title="Live Streaming MTQ Gerung"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                    <Tv className="w-12 h-12 text-slate-500" />
                    <p className="text-sm font-semibold text-slate-300">Belum ada link streaming video eksternal yang diatur.</p>
                    <button
                      onClick={() => setIsEditingStreamUrl(true)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
                    >
                      Masukkan Link YouTube / OBS
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 3. VIRTUAL STAGE MODE */}
            {videoSourceMode === 'virtual' && (
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-950 flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                  <div className="w-96 h-96 border-[16px] border-amber-400 rounded-full rotate-45"></div>
                  <div className="w-96 h-96 border-[16px] border-emerald-400 rounded-full -rotate-45"></div>
                </div>

                <div className="relative z-10 max-w-xl mx-auto space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-900/80 p-1.5 border-2 border-amber-400 shadow-2xl flex items-center justify-center" title="Pemerintah Kabupaten Lombok Barat">
                      <img
                        src={LOGO_LOMBOK_BARAT}
                        alt="Logo Lombok Barat"
                        className="w-full h-full object-contain drop-shadow"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-emerald-900/80 p-1.5 border-2 border-emerald-400 shadow-2xl flex items-center justify-center" title="LPTQ / MTQ Nasional">
                      <img
                        src={LOGO_MTQ_NATIONAL}
                        alt="Logo MTQ"
                        className="w-full h-full object-contain drop-shadow"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-emerald-900/90 border border-emerald-700/80 px-3.5 py-1 rounded-full text-xs text-amber-300 font-semibold shadow">
                    <span>{activeArena.icon}</span>
                    <span>{activeArena.name}</span>
                    <span>•</span>
                    <span className="text-white">{activeArena.location}</span>
                  </div>

                  {performingParticipant ? (
                    <div className="space-y-2">
                      <div className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                        Sedang Berada Di Panggung Tilawah:
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-amber-400 font-serif tracking-tight drop-shadow-md">
                        {performingParticipant.fullName}
                      </h3>
                      <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-200">
                        <span className="bg-emerald-800/90 border border-emerald-600 px-2.5 py-1 rounded-lg">
                          No. Undian: <strong>{performingParticipant.orderNumber}</strong> ({performingParticipant.participantCode})
                        </span>
                        <span className="bg-emerald-800/90 border border-emerald-600 px-2.5 py-1 rounded-lg text-amber-300">
                          {performingParticipant.originKafilah}
                        </span>
                        <span className="bg-emerald-800/90 border border-emerald-600 px-2.5 py-1 rounded-lg">
                          {currentBranch?.name} ({performingParticipant.category})
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 pt-4">
                        {[40, 70, 30, 85, 100, 60, 45, 90, 65, 35, 75, 50, 80, 60].map((h, i) => (
                          <div
                            key={i}
                            className="w-1 bg-gradient-to-t from-emerald-400 to-amber-300 rounded-full animate-pulse"
                            style={{
                              height: `${h * 0.35}px`,
                              animationDuration: `${0.6 + (i % 5) * 0.2}s`,
                              animationDelay: `${i * 0.05}s`
                            }}
                          ></div>
                        ))}
                      </div>
                      <div className="text-[11px] text-emerald-300 font-mono flex items-center justify-center gap-1.5 mt-2">
                        <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                        Audio Panggung & Mikrofon Mimbar Aktif
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-slate-300 space-y-1">
                      <p className="text-base font-semibold">Tidak ada peserta yang sedang tampil saat ini.</p>
                      <p className="text-xs text-slate-400">Panggung bersiap untuk penampilan peserta berikutnya.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OVERLAY: Top Header on Video */}
            <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-auto z-20">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 bg-rose-600/95 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md shadow">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  {videoSourceMode === 'camera' ? (isCameraActive ? 'LIVE KAMERA' : 'KAMERA ARENA') : 'LIVE MTQ'}
                </span>

                {isCameraActive && (
                  <span className="bg-black/60 backdrop-blur-md text-rose-300 text-xs px-2.5 py-1 rounded-md border border-white/10 font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    REC {formatDuration(streamDuration)}
                  </span>
                )}

                <span className="hidden sm:inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-emerald-300 text-xs px-2.5 py-1 rounded-md border border-white/10 font-semibold">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  {viewersCount} Pemirsa
                </span>
                <span className="bg-black/60 backdrop-blur-md text-amber-300 text-xs px-2.5 py-1 rounded-md border border-white/10 font-semibold hidden md:inline">
                  {config.edition}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {videoSourceMode === 'camera' && isCameraActive && (
                  <button
                    onClick={captureSnapshot}
                    className="p-1.5 rounded-md bg-black/60 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md transition flex items-center gap-1 text-xs"
                    title="Ambil Foto Penampilan"
                  >
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span className="hidden sm:inline text-[11px]">Foto</span>
                  </button>
                )}

                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold backdrop-blur-md transition ${
                    hasLiked ? 'bg-rose-600 text-white' : 'bg-black/60 hover:bg-black/80 text-white border border-white/10'
                  }`}
                  title="Beri apresiasi dukungan"
                >
                  <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-white' : 'text-rose-400'}`} />
                  <span>{likesCount}</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-md bg-black/60 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md transition"
                  title="Layar Penuh"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* OVERLAY: TV Broadcast Lower-Third Graphic on Video */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-auto z-20">
              {showLowerThird && performingParticipant ? (
                <div className="text-white space-y-1 max-w-lg bg-black/50 backdrop-blur-sm p-3 rounded-xl border-l-4 border-amber-400">
                  <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                    MTQ Ke-XXXII Kec. Gerung • No. Undian #{performingParticipant.orderNumber}
                  </div>
                  <div className="text-base sm:text-xl font-black text-white leading-tight font-serif tracking-wide">
                    {performingParticipant.fullName}
                  </div>
                  <div className="text-xs text-emerald-300 font-medium flex items-center gap-2 flex-wrap">
                    <span className="bg-emerald-950/80 px-2 py-0.5 rounded text-emerald-200 border border-emerald-700/50">
                      {performingParticipant.originKafilah}
                    </span>
                    <span>•</span>
                    <span>{currentBranch?.name} ({performingParticipant.category})</span>
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              {/* Player Bottom Right Controls */}
              <div className="flex items-center gap-2 shrink-0">
                {videoSourceMode === 'camera' && isCameraActive && (
                  <button
                    onClick={toggleMic}
                    className={`p-2 rounded-lg text-white backdrop-blur-md transition ${
                      isMicMuted ? 'bg-rose-600/80 hover:bg-rose-700' : 'bg-white/10 hover:bg-white/20'
                    }`}
                    title={isMicMuted ? 'Mikrofon Dibisukan (Nyalakan)' : 'Mikrofon Aktif (Bisukan)'}
                  >
                    {isMicMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                )}

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition"
                  title={isPlaying ? 'Jeda' : 'Putar'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition"
                  title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Performing Participant Card & Quick Juri Actions */}
          {performingParticipant && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(performingParticipant.status)}
                    <span className="text-xs font-mono font-bold text-slate-500">
                      ID: {performingParticipant.participantCode}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {performingParticipant.fullName}
                  </h3>
                  <div className="text-xs text-slate-600">
                    Asal Kafilah: <strong className="text-emerald-800 font-semibold">{performingParticipant.originKafilah}</strong>
                  </div>
                </div>

                {/* Direct Action for Dewan Juri / Panitia */}
                <div className="flex flex-wrap gap-2">
                  {onNavigateToJudging && (
                    <button
                      onClick={() => onNavigateToJudging(performingParticipant.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-emerald-950 shadow-sm transition"
                      title="Beri penilaian dewan hakim untuk peserta ini"
                    >
                      <Award className="w-4 h-4" />
                      Beri Nilai Dewan Juri
                    </button>
                  )}

                  {onUpdateParticipantStatus && (
                    <div className="flex items-center gap-1">
                      {performingParticipant.status !== 'SEDANG_TAMPIL' && (
                        <button
                          onClick={() => onUpdateParticipantStatus(performingParticipant.id, 'SEDANG_TAMPIL')}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition"
                        >
                          Mulai Tampil
                        </button>
                      )}
                      {performingParticipant.status === 'SEDANG_TAMPIL' && (
                        <button
                          onClick={() => onUpdateParticipantStatus(performingParticipant.id, 'SELESAI')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition"
                        >
                          Selesai Tampil
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Criteria Info Grid for Audience and Judges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Cabang & Golongan</span>
                  <div className="font-bold text-slate-800 mt-0.5">{currentBranch?.name}</div>
                  <div className="text-slate-500 text-[11px]">{performingParticipant.category}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Nomor Undian Tampil</span>
                  <div className="font-extrabold text-emerald-800 text-lg mt-0.5">#{performingParticipant.orderNumber}</div>
                  <div className="text-slate-500 text-[11px]">Urutan Musabaqah</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Arena & Lokasi Mimbar</span>
                  <div className="font-bold text-slate-800 mt-0.5">{activeArena.name}</div>
                  <div className="text-slate-500 text-[11px]">{activeArena.location}</div>
                </div>
              </div>

              {/* If Group/Beregu, Show Members */}
              {performingParticipant.teamMembers && performingParticipant.teamMembers.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs">
                  <span className="font-bold text-amber-900 block mb-1">Anggota Regu Musabaqah:</span>
                  <div className="flex flex-wrap gap-2">
                    {performingParticipant.teamMembers.map((member, idx) => (
                      <span key={idx} className="bg-white border border-amber-300 px-2.5 py-0.5 rounded-md font-medium text-amber-950">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Queue List: Antrean Tampil Berikutnya di Arena Ini */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                Daftar Antrean Tampil Berikutnya ({activeArena.name})
              </h4>
              <span className="text-xs text-slate-500">
                Total {upcomingQueue.length} peserta antre
              </span>
            </div>

            {upcomingQueue.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                Tidak ada peserta lagi yang dalam antrean di arena ini.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                {upcomingQueue.map((item, idx) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center shrink-0">
                        #{item.orderNumber}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{item.fullName}</div>
                        <div className="text-slate-500 text-[11px]">{item.originKafilah} • {item.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-[11px]">{item.participantCode}</span>
                      {onUpdateParticipantStatus && (
                        <button
                          onClick={() => onUpdateParticipantStatus(item.id, 'SEDANG_TAMPIL')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300 text-[11px] transition"
                        >
                          Panggil Tampil
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LIVE CHAT & AUDIENCE INTERACTION (Right 4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[640px]">
            {/* Chat Header */}
            <div className="p-3.5 bg-emerald-950 text-white border-b border-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm">Obrolan Langsung (Live Chat)</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Interaktif
              </span>
            </div>

            {/* Chat Identity Form Switcher */}
            <div className="p-2.5 bg-slate-50 border-b border-slate-200 text-xs space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-400">Identitas Pengirim Komentar:</div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  placeholder="Nama Anda"
                  className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  value={senderKafilah}
                  onChange={e => setSenderKafilah(e.target.value)}
                  placeholder="Asal Desa / Kafilah"
                  className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/50">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-2.5 rounded-xl text-xs space-y-1 ${
                    msg.isOfficial
                      ? 'bg-amber-100/90 border border-amber-300 text-amber-950 shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1">
                      {msg.sender}
                      {msg.isOfficial && (
                        <span className="bg-amber-600 text-white text-[9px] px-1.5 py-0.2 rounded font-black">
                          PANITIA
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                  <div className="text-[10px] text-emerald-800 font-semibold">{msg.kafilah}</div>
                  <p className="text-slate-700 text-xs leading-relaxed">{msg.text}</p>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Box */}
            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={inputChat}
                onChange={e => setInputChat(e.target.value)}
                placeholder="Tulis doa atau dukungan untuk kafilah..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white text-slate-800"
              />
              <button
                type="submit"
                disabled={!inputChat.trim()}
                className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white transition shadow-sm"
                title="Kirim Pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Quick Info Box */}
          <div className="bg-emerald-900 text-emerald-100 rounded-2xl p-4 text-xs space-y-2 border border-emerald-800 shadow-sm">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Siaran Langsung Resmi LPTQ Gerung
            </div>
            <p className="text-emerald-200 leading-relaxed text-[11px]">
              Kafilah dan masyarakat dari seluruh 11 Desa & 3 Kelurahan dapat menyaksikan siaran langsung serta memberikan doa dan dukungan secara sportif.
            </p>
          </div>
        </div>
      </div>

      {/* Photo Snapshot Modal */}
      {snapshotImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-sm sm:text-base">Foto Siaran Langsung Peserta Tampil</h4>
              </div>
              <button
                onClick={() => setSnapshotImage(null)}
                className="p-1 rounded-full hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-black">
                <img
                  src={snapshotImage}
                  alt="Snapshot Peserta MTQ"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Foto dokumentasi panggung mimbar beresolusi tinggi beserta grafis peserta.
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setSnapshotImage(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Tutup
                  </button>

                  <a
                    href={snapshotImage}
                    download={`MTQ-Gerung-Foto-${performingParticipant?.fullName?.replace(/\s+/g, '-') || 'Peserta'}-${Date.now()}.jpg`}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh Foto (.JPG)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
