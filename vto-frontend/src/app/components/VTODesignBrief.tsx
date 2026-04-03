import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera, ShoppingCart, X, HelpCircle, Wand2, Zap, Video, Share2, Save, Check } from 'lucide-react';

export function VTODesignBrief() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 8);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 8) % 8);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">B2B Virtual Try-On Integration</h1>
            <p className="text-sm text-gray-600 mt-1">Modern E-commerce • Amazon-Inspired • Dark/Light Compatible</p>
          </div>
          <div className="text-sm text-gray-600">
            Slide {currentSlide + 1} of 8
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="relative">
          {/* Slide Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] border border-gray-200">
            {/* Slide 1: Product Detail Page */}
            {currentSlide === 0 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Slide 1: Product Detail Page (PDP)</h2>
                <p className="text-gray-600 mb-8">Standard Amazon-style product page with prominent Try-On CTA</p>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Mobile Preview */}
                  <div className="flex justify-center">
                    <div className="w-[390px] h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                      {/* Status Bar */}
                      <div className="bg-white px-6 py-2 flex items-center justify-between text-xs text-black border-b border-gray-100">
                        <span>9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-3 border border-black rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* Product Image */}
                      <div className="bg-gray-100 h-[280px] flex items-center justify-center">
                        <div className="w-48 h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                          <svg className="w-32 h-32 text-gray-500" viewBox="0 0 100 100">
                            <path d="M 50 10 L 70 25 L 70 35 L 60 35 L 60 80 L 40 80 L 40 35 L 30 35 L 30 25 Z" 
                                  fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-4 text-black">
                        <div className="text-xs text-blue-600 mb-1">Visit the Amazon Essentials Store</div>
                        <h3 className="font-bold text-sm mb-2">Men's Regular-Fit Short-Sleeve Crewneck T-Shirt</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-orange-400 text-xs">★</span>
                            ))}
                          </div>
                          <span className="text-xs text-blue-600">12,453 ratings</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">$14.90</div>
                        <div className="text-xs text-gray-600 mb-4">Prime delivery: Tomorrow</div>
                        
                        {/* Size Selector */}
                        <div className="mb-4">
                          <div className="text-xs font-semibold mb-2">Size: Medium</div>
                          <div className="flex gap-2">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                              <button
                                key={size}
                                className={`px-4 py-2 border rounded text-xs ${
                                  size === 'M' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Try-On Button - PROMINENT */}
                        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-full font-bold mb-2 flex items-center justify-center gap-2 shadow-lg">
                          <Wand2 className="w-5 h-5" />
                          Try On with AR
                        </button>
                        
                        {/* Standard Buttons */}
                        <button className="w-full bg-yellow-400 text-black py-3 rounded-full font-semibold mb-2">
                          Add to Cart
                        </button>
                        <button className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Key Feature</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <Wand2 className="w-5 h-5 text-purple-600 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-900">Prominent "Try-On" Button</p>
                            <p className="text-sm text-gray-600">Positioned above Add to Cart with distinctive gradient styling</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Camera className="w-5 h-5 text-blue-600 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-900">AR Camera Icon</p>
                            <p className="text-sm text-gray-600">Visual indicator of augmented reality feature</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-yellow-600 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-900">Single Touch Action</p>
                            <p className="text-sm text-gray-600">One tap triggers the VTO module instantly</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Design Notes</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Uses gradient purple-to-blue to stand out from standard Amazon buttons</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Positioned strategically above purchase buttons for high visibility</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Typography: Roboto/San Francisco for consistent mobile experience</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2: VTO Launch & Permission */}
            {currentSlide === 1 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Slide 2: VTO Launch & Permission</h2>
                <p className="text-gray-600 mb-8">Bottom-sheet overlay requesting camera access with user guidance</p>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Mobile Preview */}
                  <div className="flex justify-center">
                    <div className="w-[390px] h-[600px] bg-gray-100 rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200">
                      {/* Dimmed Background */}
                      <div className="absolute inset-0 bg-black opacity-50"></div>
                      
                      {/* Bottom Sheet */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 text-black shadow-2xl">
                        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
                        
                        <div className="text-center mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Camera className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">Virtual Try-On</h3>
                          <p className="text-gray-600 text-sm">
                            See how this T-shirt looks on you in real-time using your camera
                          </p>
                        </div>
                        
                        {/* Alignment Guide Visual */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                          <div className="flex items-center justify-center gap-4">
                            <div className="text-center">
                              <div className="w-16 h-20 border-2 border-dashed border-gray-400 rounded-lg mb-2 relative">
                                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-400"></div>
                                <div className="absolute top-1/3 left-1 w-2 h-2 rounded-full bg-gray-400"></div>
                                <div className="absolute top-1/3 right-1 w-2 h-2 rounded-full bg-gray-400"></div>
                              </div>
                              <p className="text-xs text-gray-600">Stand here</p>
                            </div>
                            <div className="text-gray-400">→</div>
                            <div className="text-center">
                              <div className="w-16 h-20 border-2 border-green-500 rounded-lg mb-2 bg-green-50 relative">
                                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-green-500"></div>
                                <div className="absolute top-1/3 left-1 w-2 h-2 rounded-full bg-green-500"></div>
                                <div className="absolute top-1/3 right-1 w-2 h-2 rounded-full bg-green-500"></div>
                              </div>
                              <p className="text-xs text-green-600">Aligned!</p>
                            </div>
                          </div>
                        </div>
                        
                        <button className="w-full bg-blue-600 text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 mb-3">
                          <Camera className="w-5 h-5" />
                          Enable Camera
                        </button>
                        
                        <button className="w-full text-gray-600 py-3 rounded-full font-semibold">
                          Cancel
                        </button>
                        
                        <p className="text-xs text-center text-gray-500 mt-4">
                          Your privacy is protected. Camera access is only used for try-on.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">UI Components</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold text-gray-900">Bottom Sheet Overlay</p>
                            <p className="text-sm text-gray-600">Slides up from bottom with smooth animation</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold text-gray-900">Feature Explanation</p>
                            <p className="text-sm text-gray-600">Clear description of VTO functionality</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold text-gray-900">Alignment Preview</p>
                            <p className="text-sm text-gray-600">Visual guide showing before/after alignment</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold text-gray-900">Privacy Notice</p>
                            <p className="text-sm text-gray-600">Reassurance about camera usage</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">User Flow</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">1</div>
                          <span className="text-sm text-gray-700">User taps "Try On with AR" button</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">2</div>
                          <span className="text-sm text-gray-700">Bottom sheet slides up with explanation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">3</div>
                          <span className="text-sm text-gray-700">User reviews alignment guide</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">4</div>
                          <span className="text-sm text-gray-700">User grants camera permission</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 3: Main Camera View */}
            {currentSlide === 2 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Slide 3: Main Camera View (The Hub)</h2>
                <p className="text-gray-600 mb-8">Full-screen camera interface with body alignment guides</p>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Mobile Preview */}
                  <div className="flex justify-center">
                    <div className="w-[390px] h-[600px] bg-black rounded-3xl shadow-2xl overflow-hidden relative border border-gray-300">
                      {/* Top Bar */}
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10 flex items-center justify-between">
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <X className="w-6 h-6 text-white" />
                        </button>
                        <span className="text-white font-semibold text-sm">Men's Crewneck T-Shirt</span>
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <HelpCircle className="w-6 h-6 text-white" />
                        </button>
                      </div>
                      
                      {/* Camera View with Body Skeleton */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        {/* Body Skeleton Guide */}
                        <svg className="w-48 h-96 opacity-40" viewBox="0 0 100 200">
                          {/* Head */}
                          <circle cx="50" cy="20" r="12" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                          {/* Neck */}
                          <line x1="50" y1="32" x2="50" y2="45" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                          {/* Shoulders */}
                          <line x1="30" y1="55" x2="70" y2="55" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
                          {/* Arms */}
                          <line x1="30" y1="55" x2="20" y2="95" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                          <line x1="70" y1="55" x2="80" y2="95" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                          {/* Torso */}
                          <line x1="50" y1="45" x2="50" y2="120" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
                          {/* Hips */}
                          <line x1="35" y1="120" x2="65" y2="120" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
                          {/* Legs */}
                          <line x1="40" y1="120" x2="35" y2="180" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                          <line x1="60" y1="120" x2="65" y2="180" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                          {/* Joint markers */}
                          <circle cx="30" cy="55" r="3" fill="rgba(255,255,255,0.8)" />
                          <circle cx="70" cy="55" r="3" fill="rgba(255,255,255,0.8)" />
                          <circle cx="50" cy="120" r="3" fill="rgba(255,255,255,0.8)" />
                        </svg>
                        
                        {/* Alignment Text */}
                        <div className="absolute bottom-32 left-0 right-0 text-center">
                          <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-2 inline-block">
                            <p className="text-white text-sm font-semibold">Align your body with the guide</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
                        <div className="flex items-center justify-around">
                          <button className="flex flex-col items-center gap-1">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                              <Camera className="w-7 h-7 text-black" />
                            </div>
                            <span className="text-white text-xs font-semibold">Capture</span>
                          </button>
                          
                          <button className="flex flex-col items-center gap-1">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white">
                              <div className="flex gap-1">
                                <div className="w-8 h-10 bg-white/50 rounded"></div>
                                <div className="w-8 h-10 bg-white rounded"></div>
                              </div>
                            </div>
                            <span className="text-white text-xs font-semibold">Compare</span>
                          </button>
                          
                          <button className="flex flex-col items-center gap-1">
                            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                              <ShoppingCart className="w-7 h-7 text-black" />
                            </div>
                            <span className="text-white text-xs font-semibold">Add Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Interface Elements</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <X className="w-5 h-5 text-red-600 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-900">Close Button</p>
                            <p className="text-sm text-gray-600">Exit VTO and return to product page</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-blue-600 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-900">Help Button</p>
                            <p className="text-sm text-gray-600">Quick tips for better try-on experience</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 border-2 border-gray-400 rounded mt-1"></div>
                          <div>
                            <p className="font-semibold text-gray-900">Body Skeleton Guide</p>
                            <p className="text-sm text-gray-600">Ghost-white outline for positioning accuracy</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Bottom Actions</h3>
                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 border border-gray-200">
                          <Camera className="w-6 h-6 text-gray-900" />
                          <div>
                            <p className="font-semibold text-gray-900">Capture</p>
                            <p className="text-xs text-gray-600">Single touch to take photo</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 border border-gray-200">
                          <div className="w-6 h-6 flex gap-0.5">
                            <div className="w-2.5 h-6 bg-gray-400 rounded-sm"></div>
                            <div className="w-2.5 h-6 bg-gray-700 rounded-sm"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Compare</p>
                            <p className="text-xs text-gray-600">Before/after toggle view</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 border border-gray-200">
                          <ShoppingCart className="w-6 h-6 text-yellow-600" />
                          <div>
                            <p className="font-semibold text-gray-900">Add to Cart</p>
                            <p className="text-xs text-gray-600">Quick purchase from VTO</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 4: Mode Selection Menu */}
            {currentSlide === 3 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Slide 4: Mode Selection Menu</h2>
                <p className="text-gray-600 mb-8">Vertical menu for different VTO categories with active state</p>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Mobile Preview */}
                  <div className="flex justify-center">
                    <div className="w-[390px] h-[600px] bg-black rounded-3xl shadow-2xl overflow-hidden relative border border-gray-300">
                      {/* Camera Background (Blurred) */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 blur-sm"></div>
                      
                      {/* Side Menu */}
                      <div className="absolute top-16 right-4 bottom-16 w-32 bg-black/90 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-white/10">
                        <div className="space-y-2">
                          {/* Face */}
                          <button className="w-full bg-white/10 rounded-xl p-3 flex flex-col items-center gap-2 border border-white/10 transition-all hover:bg-white/20">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="9" cy="10" r="1" fill="currentColor" />
                                <circle cx="15" cy="10" r="1" fill="currentColor" />
                                <path d="M8 15 Q12 17 16 15" />
                              </svg>
                            </div>
                            <span className="text-white text-xs font-semibold">Face</span>
                            <span className="text-gray-400 text-[10px]">Makeup</span>
                          </button>
                          
                          {/* Body - ACTIVE */}
                          <button className="w-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-3 flex flex-col items-center gap-2 border-2 border-white shadow-lg scale-105">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2 L8 6 L8 8 L6 8 L6 14 L8 14 L8 22 L10 22 L10 14 L14 14 L14 22 L16 22 L16 14 L18 14 L18 8 L16 8 L16 6 Z" />
                              </svg>
                            </div>
                            <span className="text-white text-xs font-bold">Body</span>
                            <span className="text-white/90 text-[10px]">T-Shirts</span>
                          </button>
                          
                          {/* Feet */}
                          <button className="w-full bg-white/10 rounded-xl p-3 flex flex-col items-center gap-2 border border-white/10 transition-all hover:bg-white/20">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 18 L8 14 L8 10 L12 8 L16 10 L16 14 L21 18" />
                                <ellipse cx="12" cy="18" rx="9" ry="3" />
                              </svg>
                            </div>
                            <span className="text-white text-xs font-semibold">Feet</span>
                            <span className="text-gray-400 text-[10px]">Shoes</span>
                          </button>
                          
                          {/* Hands */}
                          <button className="w-full bg-white/10 rounded-xl p-3 flex flex-col items-center gap-2 border border-white/10 transition-all hover:bg-white/20">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="8" />
                                <path d="M12 8 L12 12 L15 15" />
                              </svg>
                            </div>
                            <span className="text-white text-xs font-semibold">Hands</span>
                            <span className="text-gray-400 text-[10px]">Watches</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Active Mode Indicator */}
                      <div className="absolute top-6 left-6 bg-blue-600 backdrop-blur-md rounded-full px-4 py-2">
                        <p className="text-white text-xs font-bold">BODY MODE ACTIVE</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Mode Categories</h3>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border border-pink-200">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500"></div>
                            <span className="font-bold text-gray-900">Face Mode</span>
                          </div>
                          <p className="text-sm text-gray-700">Lipstick, eyeshadow, glasses, earrings</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-500">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                            <span className="font-bold text-gray-900">Body Mode</span>
                            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-bold">ACTIVE</span>
                          </div>
                          <p className="text-sm text-gray-700">T-shirts, dresses, jackets, tops</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500"></div>
                            <span className="font-bold text-gray-900">Feet Mode</span>
                          </div>
                          <p className="text-sm text-gray-700">Sneakers, sandals, boots, heels</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500"></div>
                            <span className="font-bold text-gray-900">Hands Mode</span>
                          </div>
                          <p className="text-sm text-gray-700">Watches, bracelets, rings, gloves</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Interaction Design</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Vertical scroll menu triggered from main camera view</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Active mode highlighted with gradient and scale effect</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Each mode shows icon, label, and product category</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Switches alignment guide based on selected mode</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 5: Alignment & Lighting Guide */}
            {currentSlide === 4 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Slide 5: Alignment & Lighting Guide</h2>
                <p className="text-gray-600 mb-8">Real-time feedback for optimal positioning and lighting conditions</p>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Mobile Preview */}
                  <div className="flex justify-center">
                    <div className="w-[390px] h-[600px] bg-black rounded-3xl shadow-2xl overflow-hidden relative border border-gray-300">
                      {/* Camera View */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                      
                      {/* Skeleton Overlay - ALIGNED */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-48 h-96" viewBox="0 0 100 200">
                          {/* Head */}
                          <circle cx="50" cy="20" r="12" fill="none" stroke="rgba(34,197,94,0.8)" strokeWidth="3" />
                          <circle cx="50" cy="20" r="12" fill="rgba(34,197,94,0.2)" />
                          {/* Neck */}
                          <line x1="50" y1="32" x2="50" y2="45" stroke="rgba(34,197,94,0.8)" strokeWidth="3" />
                          {/* Shoulders */}
                          <line x1="30" y1="55" x2="70" y2="55" stroke="rgba(34,197,94,0.8)" strokeWidth="4" />
                          {/* Arms */}
                          <line x1="30" y1="55" x2="20" y2="95" stroke="rgba(34,197,94,0.8)" strokeWidth="3" />
                          <line x1="70" y1="55" x2="80" y2="95" stroke="rgba(34,197,94,0.8)" strokeWidth="3" />
                          {/* Torso */}
                          <line x1="50" y1="45" x2="50" y2="120" stroke="rgba(34,197,94,0.8)" strokeWidth="4" />
                          <rect x="35" y="45" width="30" height="75" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.6)" strokeWidth="2" rx="4" />
                          {/* Hips */}
                          <line x1="35" y1="120" x2="65" y2="120" stroke="rgba(34,197,94,0.8)" strokeWidth="4" />
                          {/* Legs */}
                          <line x1="40" y1="120" x2="35" y2="180" stroke="rgba(34,197,94,0.8)" strokeWidth="3" />
                          <line x1="60" y1="120" x2="65" y2="180" stroke="rgba(34,197,94,0.8)" strokeWidth="3" />
                          {/* Joint markers - GREEN */}
                          <circle cx="30" cy="55" r="4" fill="rgba(34,197,94,1)" stroke="white" strokeWidth="1" />
                          <circle cx="70" cy="55" r="4" fill="rgba(34,197,94,1)" stroke="white" strokeWidth="1" />
                          <circle cx="50" cy="120" r="4" fill="rgba(34,197,94,1)" stroke="white" strokeWidth="1" />
                          <circle cx="50" cy="45" r="4" fill="rgba(34,197,94,1)" stroke="white" strokeWidth="1" />
                        </svg>
                      </div>
                      
                      {/* Alignment Status - GOOD */}
                      <div className="absolute top-20 left-0 right-0 flex justify-center">
                        <div className="bg-green-500 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-2 shadow-lg">
                          <Check className="w-5 h-5 text-white" />
                          <span className="text-white font-bold">Perfect Alignment!</span>
                        </div>
                      </div>
                      
                      {/* Lighting Indicator */}
                      <div className="absolute top-36 right-6">
                        <div className="bg-yellow-500 rounded-2xl p-4 shadow-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-5 h-5 text-white" />
                            <span className="text-white font-bold text-sm">Lighting</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-white/30 rounded-full overflow-hidden">
                                <div className="w-14 h-full bg-white rounded-full"></div>
                              </div>
                              <span className="text-white text-xs">Good</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Alignment Tips */}
                      <div className="absolute bottom-32 left-6 right-6">
                        <div className="bg-black/80 backdrop-blur-md rounded-2xl p-4">
                          <h4 className="text-white font-bold text-sm mb-2">Tips for Best Results:</h4>
                          <ul className="space-y-1 text-xs text-gray-300">
                            <li className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-400 mt-0.5" />
                              <span>Stand 3-4 feet from camera</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-400 mt-0.5" />
                              <span>Face camera directly</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-400 mt-0.5" />
                              <span>Ensure good lighting</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Real-Time Feedback</h3>
                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-semibold text-green-600">Perfect Alignment</span>
                          </div>
                          <p className="text-sm text-gray-600">All body keypoints detected and positioned correctly</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                            <span className="font-semibold text-yellow-600">Needs Adjustment</span>
                          </div>
                          <p className="text-sm text-gray-600">User too close/far or not centered in frame</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="font-semibold text-red-600">Poor Detection</span>
                          </div>
                          <p className="text-sm text-gray-600">Body not visible or lighting insufficient</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Skeleton Wireframe</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Ghost-white outline when searching for body</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Green highlight when properly aligned</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Joint markers show key detection points</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Torso rectangle indicates clothing placement area</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Lighting Detection</h3>
                      <p className="text-sm text-gray-700 mb-3">Real-time analysis of ambient lighting conditions with visual feedback bar</p>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-gray-700">
                            <span className="text-red-600">Too Dark</span>
                            <span className="text-yellow-600">Fair</span>
                            <span className="text-green-600">Perfect</span>
                          </div>
                          <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 6: Try-On Overlay (Active VTO) */}
            {currentSlide === 5 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Slide 6: The Try-On Overlay (Active VTO)</h2>
                <p className="text-gray-600 mb-8">Real-time 3D garment overlay with instant color variants</p>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Mobile Preview */}
                  <div className="flex justify-center">
                    <div className="w-[390px] h-[600px] bg-black rounded-3xl shadow-2xl overflow-hidden relative border border-gray-300">
                      {/* Camera with Person Silhouette */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        {/* Person Silhouette */}
                        <div className="relative">
                          <svg className="w-48 h-96 opacity-30" viewBox="0 0 100 200">
                            <circle cx="50" cy="20" r="12" fill="rgba(255,255,255,0.5)" />
                            <ellipse cx="50" cy="80" rx="35" ry="45" fill="rgba(255,255,255,0.5)" />
                            <rect x="20" y="55" width="15" height="60" fill="rgba(255,255,255,0.5)" rx="7" />
                            <rect x="65" y="55" width="15" height="60" fill="rgba(255,255,255,0.5)" rx="7" />
                            <rect x="35" y="125" width="12" height="70" fill="rgba(255,255,255,0.5)" rx="6" />
                            <rect x="53" y="125" width="12" height="70" fill="rgba(255,255,255,0.5)" rx="6" />
                          </svg>
                          
                          {/* T-SHIRT OVERLAY - Blue */}
                          <div className="absolute top-[52px] left-1/2 -translate-x-1/2">
                            <svg className="w-36 h-32" viewBox="0 0 100 80">
                              {/* T-shirt shape with realistic texture */}
                              <defs>
                                <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#3b82f6" />
                                  <stop offset="50%" stopColor="#2563eb" />
                                  <stop offset="100%" stopColor="#1d4ed8" />
                                </linearGradient>
                              </defs>
                              
                              {/* Main shirt body */}
                              <path 
                                d="M 30 15 L 20 25 L 20 35 L 25 35 L 25 75 L 75 75 L 75 35 L 80 35 L 80 25 L 70 15 L 65 15 L 60 20 L 40 20 L 35 15 Z" 
                                fill="url(#shirtGradient)"
                                stroke="#1e40af"
                                strokeWidth="0.5"
                              />
                              
                              {/* Collar V-neck */}
                              <path d="M 40 20 L 50 30 L 60 20" fill="#1e3a8a" />
                              
                              {/* Shadow/wrinkles for realism */}
                              <line x1="50" y1="30" x2="50" y2="75" stroke="#1e40af" strokeWidth="1" opacity="0.3" />
                              <path d="M 30 45 Q 50 43 70 45" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5" fill="none" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Top Bar */}
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10 flex items-center justify-between">
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <X className="w-6 h-6 text-white" />
                        </button>
                        <span className="text-white font-semibold text-sm">Crewneck T-Shirt • Blue</span>
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <HelpCircle className="w-6 h-6 text-white" />
                        </button>
                      </div>
                      
                      {/* Color Swatches - RGBW */}
                      <div className="absolute bottom-32 left-0 right-0 flex justify-center z-10">
                        <div className="bg-black/80 backdrop-blur-xl rounded-full px-6 py-3 flex items-center gap-4">
                          <button className="w-12 h-12 rounded-full border-2 border-white/50 bg-red-500 shadow-lg transition-transform hover:scale-110"></button>
                          <button className="w-12 h-12 rounded-full border-2 border-white/50 bg-green-500 shadow-lg transition-transform hover:scale-110"></button>
                          <button className="w-14 h-14 rounded-full border-4 border-white bg-blue-500 shadow-xl scale-110">
                            <Check className="w-6 h-6 text-white mx-auto" />
                          </button>
                          <button className="w-12 h-12 rounded-full border-2 border-white/50 bg-white shadow-lg transition-transform hover:scale-110"></button>
                        </div>
                      </div>
                      
                      {/* Bottom Actions */}
                      <div className="absolute bottom-6 left-0 right-0 px-6 z-10">
                        <div className="flex items-center justify-around">
                          <button className="flex flex-col items-center gap-1">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <Camera className="w-6 h-6 text-black" />
                            </div>
                          </button>
                          
                          <button className="flex flex-col items-center gap-1">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white">
                              <div className="flex gap-1">
                                <div className="w-6 h-8 bg-white/50 rounded"></div>
                                <div className="w-6 h-8 bg-white rounded"></div>
                              </div>
                            </div>
                          </button>
                          
                          <button className="flex flex-col items-center gap-1">
                            <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                              <ShoppingCart className="w-6 h-6 text-black" />
                            </div>
                          </button>
                        </div>
                      </div>
                      
                      {/* VTO Active Indicator */}
                      <div className="absolute top-20 left-6 bg-green-500 rounded-full px-4 py-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-xs font-bold">VTO ACTIVE</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">3D Overlay Technology</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold text-gray-900">Real-Time Mapping</p>
                            <p className="text-sm text-gray-600">T-shirt texture mapped to detected body contours</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold text-gray-900">Realistic Shadows</p>
                            <p className="text-sm text-gray-600">Dynamic shading based on body shape and lighting</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div>
                            <p className="font-semibold text-gray-900">Fabric Simulation</p>
                            <p className="text-sm text-gray-600">Natural wrinkles and fold patterns</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Color Swatches (RGBW)</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 border border-red-300">
                          <div className="w-8 h-8 bg-red-500 rounded-full mb-2 shadow-lg"></div>
                          <p className="font-semibold text-sm text-gray-900">Red</p>
                          <p className="text-xs text-gray-700">Single touch</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-300">
                          <div className="w-8 h-8 bg-green-500 rounded-full mb-2 shadow-lg"></div>
                          <p className="font-semibold text-sm text-gray-900">Green</p>
                          <p className="text-xs text-gray-700">Single touch</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border-2 border-blue-500">
                          <div className="w-8 h-8 bg-blue-500 rounded-full mb-2 shadow-lg border-2 border-white">
                            <Check className="w-4 h-4 text-white mt-1 ml-1" />
                          </div>
                          <p className="font-semibold text-sm text-gray-900">Blue</p>
                          <p className="text-xs text-gray-700">Active</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-300">
                          <div className="w-8 h-8 bg-white rounded-full mb-2 shadow-lg border border-gray-300"></div>
                          <p className="font-semibold text-sm text-gray-900">White</p>
                          <p className="text-xs text-gray-700">Single touch</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-3">Instant color swap without leaving camera view</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">User Experience</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Seamless color switching in real-time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Move naturally - overlay follows body movement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>High-fidelity rendering at 30fps for smooth experience</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 7: Capture & Compare */}
            {currentSlide === 6 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Slide 7: Capture & Compare (Before/After)</h2>
                <p className="text-gray-600 mb-8">Photo and video capture with comparison tools</p>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Mobile Preview */}
                  <div className="flex justify-center">
                    <div className="w-[390px] h-[600px] bg-black rounded-3xl shadow-2xl overflow-hidden relative border border-gray-300">
                      {/* Split Screen Before/After */}
                      <div className="w-full h-full flex">
                        {/* BEFORE - Left Half */}
                        <div className="w-1/2 h-full bg-gradient-to-br from-gray-800 to-gray-900 relative border-r-2 border-white">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-24 h-48 opacity-40" viewBox="0 0 100 200">
                              <circle cx="50" cy="20" r="12" fill="rgba(255,255,255,0.5)" />
                              <ellipse cx="50" cy="80" rx="35" ry="45" fill="rgba(255,255,255,0.5)" />
                            </svg>
                          </div>
                          <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded-full">
                            <span className="text-white text-xs font-bold">BEFORE</span>
                          </div>
                        </div>
                        
                        {/* AFTER - Right Half */}
                        <div className="w-1/2 h-full bg-gradient-to-br from-gray-700 to-gray-900 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                              <svg className="w-24 h-48 opacity-30" viewBox="0 0 100 200">
                                <circle cx="50" cy="20" r="12" fill="rgba(255,255,255,0.5)" />
                                <ellipse cx="50" cy="80" rx="35" ry="45" fill="rgba(255,255,255,0.5)" />
                              </svg>
                              <div className="absolute top-[26px] left-1/2 -translate-x-1/2">
                                <svg className="w-20 h-16" viewBox="0 0 100 80">
                                  <path 
                                    d="M 30 15 L 20 25 L 20 35 L 25 35 L 25 75 L 75 75 L 75 35 L 80 35 L 80 25 L 70 15 L 65 15 L 60 20 L 40 20 L 35 15 Z" 
                                    fill="#3b82f6"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 bg-blue-600 px-3 py-1 rounded-full">
                            <span className="text-white text-xs font-bold">AFTER</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Center Slider */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-blue-500">
                          <div className="flex gap-1">
                            <ChevronLeft className="w-4 h-4 text-gray-800" />
                            <ChevronRight className="w-4 h-4 text-gray-800" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Top Bar */}
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-4 z-10 flex items-center justify-between">
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <X className="w-6 h-6 text-white" />
                        </button>
                        <span className="text-white font-semibold text-sm">Compare View</span>
                        <div className="w-10 h-10"></div>
                      </div>
                      
                      {/* Bottom Controls */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 z-10">
                        {/* Capture Buttons */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <button className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <Camera className="w-7 h-7 text-black" />
                            </div>
                            <span className="text-white text-xs font-semibold">Photo</span>
                          </button>
                          
                          <button className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                              <Video className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-white text-xs font-semibold">Hold for Video</span>
                          </button>
                        </div>
                        
                        {/* Share Options */}
                        <div className="flex items-center justify-center gap-3">
                          <button className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-full">
                            <Share2 className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-semibold">Share</span>
                          </button>
                          
                          <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                            <Save className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-semibold">Save</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Instruction */}
                      <div className="absolute top-24 left-0 right-0 flex justify-center">
                        <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                          <p className="text-white text-xs font-semibold">Drag slider to compare</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Capture Modes</h3>
                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                          <div className="flex items-center gap-3 mb-2">
                            <Camera className="w-6 h-6 text-blue-600" />
                            <span className="font-bold text-gray-900">Photo Mode</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Single touch to capture still image</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• High-resolution capture</li>
                            <li>• Instant preview</li>
                            <li>• Multiple shots allowed</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-500">
                          <div className="flex items-center gap-3 mb-2">
                            <Video className="w-6 h-6 text-red-600" />
                            <span className="font-bold text-gray-900">Video Mode</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Long press to record video clip</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Hold button to record</li>
                            <li>• Release to stop</li>
                            <li>• Maximum 15 seconds</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Before/After Toggle</h3>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-900">Split View</span>
                            <span className="text-xs text-gray-600">Default</span>
                          </div>
                          <p className="text-xs text-gray-600">Vertical slider divides screen for side-by-side comparison</p>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-900">Hold to See Original</span>
                            <span className="text-xs text-gray-600">Tap & Hold</span>
                          </div>
                          <p className="text-xs text-gray-600">Press and hold screen to temporarily view without VTO</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-900">Swipe Toggle</span>
                            <span className="text-xs text-gray-600">Quick Switch</span>
                          </div>
                          <p className="text-xs text-gray-600">Swipe left/right to alternate between views</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Sharing Options</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <Share2 className="w-5 h-5 text-blue-600 mb-2" />
                          <p className="font-semibold text-sm text-gray-900">Share</p>
                          <p className="text-xs text-gray-600">Social media, messaging</p>
                        </div>
                        
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                          <Save className="w-5 h-5 text-purple-600 mb-2" />
                          <p className="font-semibold text-sm text-gray-900">Save</p>
                          <p className="text-xs text-gray-600">Gallery, cloud storage</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 8: Conversion & Checkout */}
            {currentSlide === 7 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Slide 8: Conversion & Checkout</h2>
                <p className="text-gray-600 mb-8">Size recommendation and seamless transition to purchase</p>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Mobile Preview */}
                  <div className="flex justify-center">
                    <div className="w-[390px] h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                      {/* Status Bar */}
                      <div className="bg-white px-6 py-2 flex items-center justify-between text-xs text-black border-b border-gray-200">
                        <span>9:41</span>
                        <span className="font-semibold">Checkout</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-3 border border-black rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* VTO Preview */}
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                          <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative">
                                <svg className="w-24 h-40 opacity-30" viewBox="0 0 100 200">
                                  <circle cx="50" cy="20" r="12" fill="rgba(255,255,255,0.5)" />
                                  <ellipse cx="50" cy="80" rx="35" ry="45" fill="rgba(255,255,255,0.5)" />
                                </svg>
                                <div className="absolute top-[26px] left-1/2 -translate-x-1/2">
                                  <svg className="w-20 h-16" viewBox="0 0 100 80">
                                    <path 
                                      d="M 30 15 L 20 25 L 20 35 L 25 35 L 25 75 L 75 75 L 75 35 L 80 35 L 80 25 L 70 15 L 65 15 L 60 20 L 40 20 L 35 15 Z" 
                                      fill="#3b82f6"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-2 right-2 bg-green-500 px-2 py-1 rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3 text-white" />
                              <span className="text-white text-xs font-bold">VTO</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-4 text-black">
                        <h3 className="font-bold text-lg mb-1">Men's Crewneck T-Shirt</h3>
                        <div className="text-sm text-gray-600 mb-4">Amazon Essentials</div>
                        
                        {/* AI Size Recommendation */}
                        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-4 mb-4 border-2 border-purple-300">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                              <Wand2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-purple-900">AI Size Recommendation</span>
                          </div>
                          <div className="bg-white rounded-lg p-3 mb-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Recommended Size:</span>
                              <span className="text-2xl font-bold text-purple-600">M</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-700">Based on your VTO scan and measurements</p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-purple-200 rounded-full overflow-hidden">
                              <div className="w-[92%] h-full bg-purple-600 rounded-full"></div>
                            </div>
                            <span className="text-xs font-bold text-purple-600">92% match</span>
                          </div>
                        </div>
                        
                        {/* Selected Options */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-600">Size</span>
                            <span className="font-semibold">Medium (Recommended)</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-600">Color</span>
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-blue-500 rounded-full border border-gray-300"></div>
                              <span className="font-semibold">Blue</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-gray-600">Price</span>
                            <span className="text-xl font-bold">$14.90</span>
                          </div>
                        </div>
                        
                        {/* CTA Buttons */}
                        <div className="space-y-2">
                          <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 rounded-full font-bold shadow-lg flex items-center justify-center gap-2">
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </button>
                          
                          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-full font-bold shadow-lg">
                            Buy Now
                          </button>
                          
                          <button className="w-full text-blue-600 py-3 rounded-full font-semibold border border-blue-600">
                            Try Another Color
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">AI Size Recommendation</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <Wand2 className="w-5 h-5 text-purple-600 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-900">VTO-Based Sizing</p>
                            <p className="text-sm text-gray-600">Body measurements extracted from camera scan</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded bg-purple-600 mt-1 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">M</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Confidence Score</p>
                            <p className="text-sm text-gray-600">92% match based on shoulder width, chest, torso length</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-900">Reduces Returns</p>
                            <p className="text-sm text-gray-600">Data-driven sizing increases purchase confidence</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">Conversion Optimization</h3>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-300">
                          <ShoppingCart className="w-6 h-6 text-yellow-700 mb-2" />
                          <p className="font-semibold mb-1 text-gray-900">Streamlined Add to Cart</p>
                          <p className="text-sm text-gray-700">Pre-populated with VTO selections (size, color)</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-300">
                          <Zap className="w-6 h-6 text-orange-700 mb-2" />
                          <p className="font-semibold mb-1 text-gray-900">One-Click Buy Now</p>
                          <p className="text-sm text-gray-700">Express checkout with recommended size</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-300">
                          <Camera className="w-6 h-6 text-blue-700 mb-2" />
                          <p className="font-semibold mb-1 text-gray-900">VTO Preview Thumbnail</p>
                          <p className="text-sm text-gray-700">Visual reminder of try-on experience</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-600">User Flow Summary</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold text-white">1</div>
                          <span className="text-gray-700">VTO scan completes</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold text-white">2</div>
                          <span className="text-gray-700">AI generates size recommendation</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold text-white">3</div>
                          <span className="text-gray-700">User reviews VTO preview & sizing</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold text-white">4</div>
                          <span className="text-gray-700">Single tap to add to cart</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold text-white">5</div>
                          <span className="text-gray-700">Returns to main app for checkout</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-sm text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === 7}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Quick Navigation */}
          <div className="mt-6 grid grid-cols-4 gap-3">
            {[
              { index: 0, title: 'Product Page', icon: ShoppingCart },
              { index: 1, title: 'Permission', icon: Camera },
              { index: 2, title: 'Camera Hub', icon: Camera },
              { index: 3, title: 'Mode Selection', icon: Wand2 },
              { index: 4, title: 'Alignment', icon: Zap },
              { index: 5, title: 'Active VTO', icon: Wand2 },
              { index: 6, title: 'Capture', icon: Video },
              { index: 7, title: 'Checkout', icon: ShoppingCart },
            ].map(({ index, title, icon: Icon }) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  currentSlide === index
                    ? 'bg-blue-600 text-white shadow-lg scale-105 border-blue-700'
                    : 'bg-white text-gray-900 hover:bg-gray-50 border-gray-200'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <div className="text-xs font-semibold">{title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
