import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Type, Image, Wand2, Layout, Film, Upload, Download,
  History, Sparkles, Zap, Loader2, X, Check, Play, Pause,
  Settings, CreditCard, Crown, AlertCircle
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

interface VideoHistoryItem {
  id: string
  type: string
  prompt: string
  status: 'generating' | 'completed' | 'failed'
  createdAt: string
  thumbnail?: string
  duration?: string
  quality?: string
}

const tools = [
  { id: 'text-to-video', name: 'Text to Video', icon: Type, desc: 'Generate from text prompts' },
  { id: 'image-to-video', name: 'Image to Video', icon: Image, desc: 'Animate your images' },
  { id: 'ai-animation', name: 'AI Animation', icon: Wand2, desc: 'Create fluid animations' },
  { id: 'thumbnail', name: 'Thumbnail', icon: Layout, desc: 'Generate thumbnails' },
  { id: 'cinematic', name: 'Cinematic', icon: Film, desc: 'Apply effects & filters' },
]

const qualityOptions = [
  { value: '720p', label: '720p HD', credits: 1 },
  { value: '1080p', label: '1080p FHD', credits: 2 },
  { value: '4k', label: '4K Ultra HD', credits: 4 },
]

const durationOptions = [
  { value: '5', label: '5 seconds', credits: 1 },
  { value: '8', label: '8 seconds', credits: 1 },
  { value: '15', label: '15 seconds', credits: 2 },
  { value: '30', label: '30 seconds', credits: 4 },
  { value: '60', label: '60 seconds', credits: 8 },
]

const mockHistory: VideoHistoryItem[] = [
  { id: '1', type: 'Text to Video', prompt: 'A futuristic city at night with neon lights', status: 'completed', createdAt: '2 min ago', duration: '8s', quality: '1080p' },
  { id: '2', type: 'Image to Video', prompt: 'Sunset beach animation', status: 'completed', createdAt: '1 hour ago', duration: '5s', quality: '720p' },
  { id: '3', type: 'AI Animation', prompt: 'Abstract particle flow', status: 'generating', createdAt: 'Just now', duration: '15s', quality: '1080p' },
]

const DashboardPage = () => {
  const { user, userData } = useAuth()
  const [activeTool, setActiveTool] = useState('text-to-video')
  const [prompt, setPrompt] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [selectedQuality, setSelectedQuality] = useState('1080p')
  const [selectedDuration, setSelectedDuration] = useState('8')
  const [history, setHistory] = useState<VideoHistoryItem[]>(mockHistory)
  const [showHistory, setShowHistory] = useState(false)
  const [activeTab, setActiveTab] = useState<'create' | 'history' | 'settings'>('create')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image must be under 10MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
        toast.success('Image uploaded successfully')
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim() && !uploadedImage) {
      toast.error('Please enter a prompt or upload an image')
      return
    }

    const creditsNeeded = qualityOptions.find(q => q.value === selectedQuality)?.credits || 1
    const durationCredits = durationOptions.find(d => d.value === selectedDuration)?.credits || 1
    const totalCredits = creditsNeeded * durationCredits

    if ((userData?.credits || 0) < totalCredits) {
      toast.error(`Not enough credits. Need ${totalCredits} credits. Upgrade your plan!`)
      return
    }

    setIsGenerating(true)
    setGeneratedVideo(null)

    // Simulate generation
    const newHistoryItem: VideoHistoryItem = {
      id: Date.now().toString(),
      type: tools.find(t => t.id === activeTool)?.name || 'Unknown',
      prompt: prompt || 'Image-based generation',
      status: 'generating',
      createdAt: 'Just now',
      duration: selectedDuration + 's',
      quality: selectedQuality,
    }

    setHistory(prev => [newHistoryItem, ...prev])

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    setIsGenerating(false)
    setGeneratedVideo('https://example.com/video.mp4') // Placeholder

    setHistory(prev => 
      prev.map(item => 
        item.id === newHistoryItem.id ? { ...item, status: 'completed' as const } : item
      )
    )

    toast.success('Video generated successfully!')
  }

  const handleDownload = () => {
    toast.success('Download started!')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-velora-green mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Please Sign In</h2>
          <p className="text-velora-gray-text mb-6">Sign in to access the AI video generation dashboard.</p>
          <Link to="/login" className="btn-primary inline-flex items-center gap-2">
            Sign In <Zap className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-velora-gray-text text-sm mt-1">Create, manage, and download your AI videos</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-velora-gray/50 px-4 py-2 rounded-xl border border-white/5">
              <Zap className="w-4 h-4 text-velora-green" />
              <span className="text-sm font-semibold text-velora-green">{userData?.credits || 0}</span>
              <span className="text-xs text-velora-gray-muted">credits</span>
            </div>
            <Link to="/pricing" className="flex items-center gap-2 px-4 py-2 bg-velora-green/10 border border-velora-green/30 rounded-xl text-sm font-medium text-velora-green hover:bg-velora-green/20 transition-all">
              <Crown className="w-4 h-4" />
              Upgrade
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-velora-gray/30 p-1 rounded-xl mb-8 w-fit">
          {[
            { id: 'create' as const, label: 'Create', icon: Sparkles },
            { id: 'history' as const, label: 'History', icon: History },
            { id: 'settings' as const, label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-velora-green/20 text-velora-green'
                    : 'text-velora-gray-text hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Create Tab */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Tools & Settings */}
            <div className="lg:col-span-1 space-y-6">
              {/* Tool Selector */}
              <div className="glass-card rounded-2xl p-5 gradient-border">
                <h3 className="text-sm font-semibold text-white mb-4">Select Tool</h3>
                <div className="space-y-2">
                  {tools.map((tool) => {
                    const Icon = tool.icon
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                          activeTool === tool.id
                            ? 'bg-velora-green/10 border border-velora-green/30 text-velora-green'
                            : 'bg-white/5 border border-transparent text-velora-gray-text hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="text-left">
                          <div className="text-sm font-medium">{tool.name}</div>
                          <div className="text-[10px] opacity-70">{tool.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Settings */}
              <div className="glass-card rounded-2xl p-5 gradient-border">
                <h3 className="text-sm font-semibold text-white mb-4">Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-velora-gray-muted mb-2 block">Quality</label>
                    <div className="grid grid-cols-3 gap-2">
                      {qualityOptions.map((q) => (
                        <button
                          key={q.value}
                          onClick={() => setSelectedQuality(q.value)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            selectedQuality === q.value
                              ? 'bg-velora-green/20 text-velora-green border border-velora-green/30'
                              : 'bg-white/5 text-velora-gray-text border border-transparent hover:bg-white/10'
                          }`}
                        >
                          {q.label}
                          <span className="block text-[10px] opacity-70">{q.credits} cr</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-velora-gray-muted mb-2 block">Duration</label>
                    <div className="grid grid-cols-2 gap-2">
                      {durationOptions.map((d) => (
                        <button
                          key={d.value}
                          onClick={() => setSelectedDuration(d.value)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            selectedDuration === d.value
                              ? 'bg-velora-green/20 text-velora-green border border-velora-green/30'
                              : 'bg-white/5 text-velora-gray-text border border-transparent hover:bg-white/10'
                          }`}
                        >
                          {d.label}
                          <span className="block text-[10px] opacity-70">{d.credits} cr</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Prompt & Preview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Prompt Input */}
              <div className="glass-card rounded-2xl p-5 sm:p-6 gradient-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Prompt</h3>
                  {activeTool === 'image-to-video' && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 text-xs text-velora-green hover:underline"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload Image
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {uploadedImage && (
                  <div className="relative mb-4 rounded-xl overflow-hidden">
                    <img src={uploadedImage} alt="Uploaded" className="w-full h-48 object-cover" />
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    activeTool === 'text-to-video'
                      ? 'Describe the video you want to create...'
                      : activeTool === 'image-to-video'
                      ? 'Describe how you want the image to animate...'
                      : 'Enter your prompt...'
                  }
                  className="input-field min-h-[120px] resize-none mb-4"
                />

                <div className="flex items-center justify-between">
                  <div className="text-xs text-velora-gray-muted">
                    Cost: <span className="text-velora-green font-semibold">
                      {(qualityOptions.find(q => q.value === selectedQuality)?.credits || 1) * 
                       (durationOptions.find(d => d.value === selectedDuration)?.credits || 1)} credits
                    </span>
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="btn-primary flex items-center gap-2 px-6 py-2.5"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Video
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Preview / Result */}
              <div className="glass-card rounded-2xl p-5 sm:p-6 gradient-border">
                <h3 className="text-sm font-semibold text-white mb-4">Preview</h3>

                {isGenerating ? (
                  <div className="aspect-video bg-velora-gray/50 rounded-xl flex flex-col items-center justify-center border border-white/5">
                    <div className="relative w-16 h-16 mb-4">
                      <div className="absolute inset-0 border-2 border-velora-green/20 rounded-full" />
                      <div className="absolute inset-0 border-2 border-velora-green border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-sm text-velora-gray-text">Generating your video...</p>
                    <p className="text-xs text-velora-gray-muted mt-1">This may take 10-30 seconds</p>
                  </div>
                ) : generatedVideo ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-velora-gray/50 rounded-xl border border-white/5 overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-velora-green/20 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-velora-green ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-white/70">
                          <span>{selectedDuration}s</span>
                          <span>•</span>
                          <span>{selectedQuality}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleDownload}
                        className="flex-1 btn-primary flex items-center justify-center gap-2 py-2.5"
                      >
                        <Download className="w-4 h-4" />
                        Download Video
                      </button>
                      <button
                        onClick={() => { setGeneratedVideo(null); setPrompt(''); setUploadedImage(null); }}
                        className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-velora-gray-text hover:text-white hover:bg-white/10 transition-all"
                      >
                        New
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-velora-gray/30 rounded-xl flex flex-col items-center justify-center border border-dashed border-white/10">
                    <Film className="w-12 h-12 text-velora-gray-muted mb-3" />
                    <p className="text-sm text-velora-gray-muted">Your generated video will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="glass-card rounded-2xl p-5 sm:p-6 gradient-border">
            <h2 className="text-xl font-bold text-white mb-6">Video History</h2>

            {history.length === 0 ? (
              <div className="text-center py-16">
                <History className="w-12 h-12 text-velora-gray-muted mx-auto mb-4" />
                <p className="text-velora-gray-text">No videos generated yet</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="mt-4 text-velora-green text-sm font-medium hover:underline"
                >
                  Create your first video
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-velora-green/20 transition-all"
                  >
                    <div className="w-12 h-12 bg-velora-gray/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.status === 'generating' ? (
                        <Loader2 className="w-5 h-5 text-velora-green animate-spin" />
                      ) : item.status === 'completed' ? (
                        <Check className="w-5 h-5 text-velora-green" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white truncate">{item.type}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          item.status === 'completed' ? 'bg-velora-green/20 text-velora-green' :
                          item.status === 'generating' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-velora-gray-muted truncate">{item.prompt}</p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-velora-gray-muted">
                        <span>{item.createdAt}</span>
                        {item.duration && <span>{item.duration}</span>}
                        {item.quality && <span>{item.quality}</span>}
                      </div>
                    </div>
                    {item.status === 'completed' && (
                      <button
                        onClick={handleDownload}
                        className="p-2 rounded-lg bg-white/5 text-velora-gray-muted hover:text-velora-green hover:bg-velora-green/10 transition-all"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <div className="glass-card rounded-2xl p-5 sm:p-6 gradient-border mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-white">Email</p>
                    <p className="text-xs text-velora-gray-muted">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-white">Current Plan</p>
                    <p className="text-xs text-velora-gray-muted capitalize">{userData?.plan || 'Free'}</p>
                  </div>
                  <Link to="/pricing" className="text-xs text-velora-green font-medium hover:underline">
                    Change Plan
                  </Link>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-white">Available Credits</p>
                    <p className="text-xs text-velora-gray-muted">{userData?.credits || 0} credits remaining</p>
                  </div>
                  <Link to="/earnings" className="text-xs text-velora-green font-medium hover:underline">
                    Buy More
                  </Link>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6 gradient-border">
              <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive updates about your videos', enabled: true },
                  { label: 'Auto-download', desc: 'Automatically download completed videos', enabled: false },
                  { label: 'High Quality Default', desc: 'Use 1080p as default quality', enabled: true },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-white">{pref.label}</p>
                      <p className="text-xs text-velora-gray-muted">{pref.desc}</p>
                    </div>
                    <button
                      className={`w-11 h-6 rounded-full transition-all ${
                        pref.enabled ? 'bg-velora-green' : 'bg-velora-gray-muted/30'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                        pref.enabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
