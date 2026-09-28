import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Star, 
  Volume2, 
  VolumeX, 
  Compass, 
  Calendar, 
  DollarSign, 
  Users, 
  Sparkles, 
  Camera, 
  Send, 
  ShieldCheck, 
  Waves, 
  CloudRain, 
  Wind, 
  Trees,
  Check,
  Info,
  X
} from 'lucide-react';
import { NATURAL_SPOTS } from '../../data/clonesData';
import { NaturalSpot } from '../../types';
import { soundEngine } from '../../utils/soundEngine';

export const NaturalSceneBDClone: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSpotModal, setActiveSpotModal] = useState<NaturalSpot | null>(null);
  const [activeSound, setActiveSound] = useState<string | null>(null);

  // Tour Calculator State
  const [calcSpot, setCalcSpot] = useState<string>(NATURAL_SPOTS[0].id);
  const [calcDays, setCalcDays] = useState<number>(3);
  const [calcTravelers, setCalcTravelers] = useState<number>(2);
  const [calcStyle, setCalcStyle] = useState<'budget' | 'standard' | 'luxury'>('standard');
  const [showBookingSuccess, setShowBookingSuccess] = useState<boolean>(false);

  // Review submission state
  const [reviews, setReviews] = useState<Array<{ name: string; spot: string; rating: number; comment: string; date: string }>>([
    {
      name: 'Ashikur Rahman',
      spot: 'Sajek Valley (Kingdom of Clouds)',
      rating: 5,
      comment: 'Waking up at 5:30 AM to see the white cloud carpet under our wooden balcony at Ruilui Para was the most spiritual view of my life!',
      date: 'Yesterday'
    },
    {
      name: 'Dr. Nusrat Jahan',
      spot: 'Sundarbans Mangrove Forest',
      rating: 5,
      comment: 'The boat safari into the Kotka wildlife sanctuary is peaceful and serene. Saw spotted deer, kingfishers, and crocodile along the banks.',
      date: '3 days ago'
    },
    {
      name: 'Farhan Kabir',
      spot: 'Tanguar Haor Wetland Sanctuary',
      rating: 5,
      comment: 'Renting a wooden bajra houseboat during the monsoon season is an unforgettable experience. The clear water and Meghalaya hills in the background are stunning.',
      date: '1 week ago'
    }
  ]);
  const [newReviewSpot, setNewReviewSpot] = useState<string>(NATURAL_SPOTS[0].name);
  const [newReviewAuthor, setNewReviewAuthor] = useState<string>('');
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [reviewSuccess, setReviewSuccess] = useState<boolean>(false);

  const categories = ['All', 'Forest', 'Hill', 'Beach', 'River', 'Haor'];

  const filteredSpots = selectedCategory === 'All'
    ? NATURAL_SPOTS
    : NATURAL_SPOTS.filter((spot) => spot.category === selectedCategory);

  const toggleSound = (soundType: 'rain' | 'waves' | 'breeze' | 'birds') => {
    if (activeSound === soundType) {
      soundEngine.stop();
      setActiveSound(null);
    } else {
      soundEngine.play(soundType);
      setActiveSound(soundType);
    }
  };

  useEffect(() => {
    return () => {
      soundEngine.stop();
    };
  }, []);

  // Calculate tour costs
  const selectedTourSpot = NATURAL_SPOTS.find((s) => s.id === calcSpot) || NATURAL_SPOTS[0];
  const baseDailyRatePerPerson = calcStyle === 'budget' ? 2200 : calcStyle === 'standard' ? 4200 : 8500;
  const totalCostBDT = calcDays * calcTravelers * baseDailyRatePerPerson;
  const totalCostUSD = Math.round(totalCostBDT / 118);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    setReviews([
      {
        name: newReviewAuthor,
        spot: newReviewSpot,
        rating: newReviewRating,
        comment: newReviewText,
        date: 'Just now'
      },
      ...reviews
    ]);
    setNewReviewAuthor('');
    setNewReviewText('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Hero Showcase */}
      <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-emerald-950/40 via-slate-900/60 to-slate-950 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Decorative backdrop glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Natural Scene Bangladesh (BD) Official Showcase
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Breathtaking Landscapes of{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Bangladesh
                </span>
              </h2>
              <p className="mt-3 text-base text-slate-300 max-w-2xl leading-relaxed">
                From the misty cloud peaks of Sajek Valley to the untamed waterways of the Sundarbans and the rolling tea gardens of Sreemangal — immerse in pure natural beauty.
              </p>
            </div>

            {/* Weather & Eco Badges */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-xl backdrop-blur-md flex flex-col gap-2 min-w-[240px]">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Current Season:</span>
                <span className="text-emerald-400 font-semibold">Post-Monsoon & Autumn</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Best Visibility:</span>
                <span className="text-cyan-400 font-semibold">Sajek & Sylhet 98%</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2 mt-1">
                <span>Ecotourism Status:</span>
                <span className="text-emerald-300 font-mono text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded">Verified Safe</span>
              </div>
            </div>
          </div>

          {/* Interactive Nature Audio Soundscapes Bar */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  {activeSound ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Natural Ambience Generator
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Live procedural synthesized soundscapes (Web Audio API)
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => toggleSound('birds')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeSound === 'birds'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Trees className="w-3.5 h-3.5" />
                  <span>Sundarbans Birds</span>
                </button>
                <button
                  onClick={() => toggleSound('breeze')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeSound === 'breeze'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>Sajek Breeze</span>
                </button>
                <button
                  onClick={() => toggleSound('rain')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeSound === 'rain'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>Sreemangal Rain</span>
                </button>
                <button
                  onClick={() => toggleSound('waves')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeSound === 'waves'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Waves className="w-3.5 h-3.5" />
                  <span>Cox's Waves</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Iconic Destinations</h3>
            <p className="text-xs text-slate-400">Discover untouched wilderness across 8 divisions</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scenic Spot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              className="group bg-slate-900/90 rounded-2xl border border-slate-800/90 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-emerald-950/20"
            >
              {/* Image Preview with Bengali subtitle */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/60 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                    {spot.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 text-amber-400 text-xs font-semibold backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{spot.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-medium text-emerald-400 block font-serif">
                    {spot.bengaliName}
                  </span>
                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {spot.name}
                  </h4>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{spot.region}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {spot.description}
                  </p>

                  {/* Highlights tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {spot.highlights.slice(0, 3).map((hl, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Season: </span>
                    <span className="text-slate-200">{spot.bestSeason}</span>
                  </div>
                  <button
                    onClick={() => setActiveSpotModal(spot)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-medium border border-emerald-500/30 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tour Budget & Itinerary Estimator */}
        <div className="mt-16 bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              Tour Budget & Trip Planner
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Estimate Your Bangladesh Nature Trip</h3>
            <p className="text-xs text-slate-400 max-w-2xl mb-6">
              Calculate realistic accommodation, local guide, boating, and food expenses for customized expeditions across Bangladesh.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Destination selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Destination</label>
                <select
                  value={calcSpot}
                  onChange={(e) => setCalcSpot(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {NATURAL_SPOTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of days */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Duration</label>
                <select
                  value={calcDays}
                  onChange={(e) => setCalcDays(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value={2}>2 Days / 1 Night (Weekend)</option>
                  <option value={3}>3 Days / 2 Nights (Recommended)</option>
                  <option value={5}>5 Days / 4 Nights (Full Circuit)</option>
                  <option value={7}>7 Days / 6 Nights (Expedition)</option>
                </select>
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Travelers</label>
                <select
                  value={calcTravelers}
                  onChange={(e) => setCalcTravelers(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value={1}>1 Solo Explorer</option>
                  <option value={2}>2 Persons (Couple / Friends)</option>
                  <option value={4}>4 Persons (Family / Small Group)</option>
                  <option value={8}>8 Persons (Group Tour)</option>
                </select>
              </div>

              {/* Accommodation Style */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Stay Type</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['budget', 'standard', 'luxury'] as const).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setCalcStyle(style)}
                      className={`px-2 py-2 rounded-lg text-[11px] font-medium capitalize transition-all ${
                        calcStyle === style
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimated Summary card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400">Estimated Total (Accommodation, Meals & Local Guides):</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-emerald-400">৳{totalCostBDT.toLocaleString()} BDT</span>
                  <span className="text-xs text-slate-400 font-mono">(approx. ${totalCostUSD} USD)</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Includes certified local eco-guide and safety permits for {selectedTourSpot.region}</span>
                </div>
              </div>

              <button
                onClick={() => setShowBookingSuccess(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 active:scale-95 transition-all whitespace-nowrap"
              >
                Inquire & Book Package
              </button>
            </div>

            {showBookingSuccess && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                <span>Inquiry saved! Tanvir from Natural Scene BD will verify dates and contact your email.</span>
                <button onClick={() => setShowBookingSuccess(false)} className="text-emerald-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Community Reviews & Photo Stories Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reviews list */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Traveler Experiences</h3>
                <p className="text-xs text-slate-400">Authentic field notes from nature enthusiasts in Bangladesh</p>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-xs text-white">{rev.name}</span>
                      <span className="text-[11px] text-slate-400 ml-2">visited <strong className="text-emerald-400">{rev.spot}</strong></span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {rev.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add your experience form */}
          <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 h-fit">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5 mb-1">
              <Camera className="w-4 h-4 text-emerald-400" />
              Submit Nature Field Report
            </h4>
            <p className="text-xs text-slate-400 mb-4">Share your recent Bangladesh travel tips</p>

            <form onSubmit={handleAddReview} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Location</label>
                <select
                  value={newReviewSpot}
                  onChange={(e) => setNewReviewSpot(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {NATURAL_SPOTS.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= newReviewRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Your Experience</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the scenery, trail conditions, or sunrise view..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Review</span>
              </button>

              {reviewSuccess && (
                <div className="p-2 rounded bg-emerald-500/20 text-emerald-300 text-xs text-center border border-emerald-500/30">
                  Review published to Natural Scene BD feed!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Spot Detail Modal */}
      {activeSpotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setActiveSpotModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-64 sm:h-72 w-full shrink-0">
              <img
                src={activeSpotModal.image}
                alt={activeSpotModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-sm font-semibold text-emerald-400 font-serif">
                  {activeSpotModal.bengaliName}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {activeSpotModal.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeSpotModal.region}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {activeSpotModal.rating} ({activeSpotModal.reviewsCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  About this Location
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activeSpotModal.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Key Natural Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSpotModal.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-950 border border-slate-800"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Best Season</span>
                  <span className="text-xs font-semibold text-emerald-400">{activeSpotModal.bestSeason}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Entry / Permits</span>
                  <span className="text-xs font-semibold text-white">{activeSpotModal.entryFee}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  onClick={() => setActiveSpotModal(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setCalcSpot(activeSpotModal.id);
                    setActiveSpotModal(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium"
                >
                  Calculate Trip Cost
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
