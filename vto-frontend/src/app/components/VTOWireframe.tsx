import React from 'react';

export function VTOWireframe() {
  return (
    <div className="w-full min-h-screen bg-white p-8 overflow-auto">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-semibold mb-8 text-gray-800">Virtual Try-On System - UX Wireframe</h1>
        
        <svg
          viewBox="0 0 1400 1000"
          className="w-full h-auto"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        >
          {/* Definitions for arrowheads */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
            </marker>
          </defs>

          {/* TOP ROW - Product Discovery */}
          {/* Product MRP / COD / UPI Button */}
          <g id="mrp-button">
            <rect x="50" y="50" width="180" height="50" fill="white" stroke="#d1d5db" strokeWidth="2" rx="4" />
            <text x="140" y="80" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="500">
              Product MRP / COD / UPI
            </text>
          </g>

          {/* Arrow to Product Page */}
          <line x1="230" y1="75" x2="280" y2="75" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* Product Page */}
          <g id="product-page">
            <rect x="280" y="30" width="220" height="260" fill="white" stroke="#d1d5db" strokeWidth="2" rx="4" />
            
            {/* T-shirt Icon */}
            <g transform="translate(340, 70)">
              <path d="M 50 10 L 70 20 L 70 30 L 60 30 L 60 80 L 40 80 L 40 30 L 30 30 L 30 20 Z" 
                    fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            
            {/* Label */}
            <text x="390" y="170" textAnchor="middle" fontSize="14" fill="#374151">-Tshirt</text>
            
            {/* Try-On S Button */}
            <rect x="320" y="200" width="140" height="60" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" rx="6" />
            <text x="390" y="235" textAnchor="middle" fontSize="15" fill="white" fontWeight="600">Try-On S</text>
          </g>

          {/* Arrow to Main Interface */}
          <line x1="390" y1="290" x2="390" y2="320" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* MIDDLE ROW - Main Interface (Smartphone in Landscape) */}
          <g id="main-interface">
            <rect x="150" y="320" width="480" height="320" fill="#f9fafb" stroke="#374151" strokeWidth="3" rx="8" />
            
            {/* Top Bar */}
            <rect x="150" y="320" width="480" height="50" fill="white" stroke="#d1d5db" strokeWidth="2" />
            
            {/* Close Button */}
            <rect x="170" y="335" width="70" height="20" fill="white" stroke="#3b82f6" strokeWidth="1.5" rx="3" />
            <text x="205" y="349" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="500">Close</text>
            
            {/* Product Name */}
            <text x="390" y="349" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="500">Product name</text>
            
            {/* Help Button */}
            <rect x="550" y="335" width="60" height="20" fill="white" stroke="#3b82f6" strokeWidth="1.5" rx="3" />
            <text x="580" y="349" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="500">Help</text>
            
            {/* Camera View */}
            <rect x="180" y="385" width="420" height="180" fill="#1f2937" stroke="#111827" strokeWidth="3" rx="4" />
            <text x="390" y="485" textAnchor="middle" fontSize="14" fill="#9ca3af" fontWeight="500">Camera view</text>
            
            {/* RGBW Lighting Controls */}
            <g id="lighting-controls" transform="translate(265, 580)">
              <circle cx="0" cy="0" r="15" fill="white" stroke="#ef4444" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="600">R</text>
              
              <circle cx="50" cy="0" r="15" fill="white" stroke="#22c55e" strokeWidth="2" />
              <text x="50" y="5" textAnchor="middle" fontSize="12" fill="#22c55e" fontWeight="600">G</text>
              
              <circle cx="100" cy="0" r="15" fill="white" stroke="#3b82f6" strokeWidth="2" />
              <text x="100" y="5" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="600">B</text>
              
              <circle cx="150" cy="0" r="15" fill="white" stroke="#6b7280" strokeWidth="2" />
              <text x="150" y="5" textAnchor="middle" fontSize="12" fill="#6b7280" fontWeight="600">W</text>
            </g>
            
            {/* Button Bar */}
            <g id="button-bar">
              <rect x="180" y="605" width="120" height="25" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5" rx="4" />
              <text x="240" y="622" textAnchor="middle" fontSize="12" fill="white" fontWeight="600">Capture</text>
              
              <rect x="320" y="605" width="120" height="25" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5" rx="4" />
              <text x="380" y="622" textAnchor="middle" fontSize="12" fill="white" fontWeight="600">Compare</text>
              
              <rect x="460" y="605" width="120" height="25" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5" rx="4" />
              <text x="520" y="622" textAnchor="middle" fontSize="12" fill="white" fontWeight="600">Add cart</text>
            </g>
          </g>

          {/* RIGHT SIDE FLOW - Mode Selection */}
          <g id="right-side-flow">
            {/* Mode Selection Stack */}
            <rect x="680" y="320" width="140" height="30" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" rx="4" />
            <text x="750" y="340" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="600">Mode Selection</text>
            
            {/* Mode Buttons */}
            <rect x="680" y="360" width="140" height="35" fill="white" stroke="#3b82f6" strokeWidth="1.5" rx="4" />
            <text x="750" y="382" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="500">Face</text>
            
            <rect x="680" y="405" width="140" height="35" fill="white" stroke="#3b82f6" strokeWidth="1.5" rx="4" />
            <text x="750" y="427" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="500">Body</text>
            
            <rect x="680" y="450" width="140" height="35" fill="white" stroke="#3b82f6" strokeWidth="1.5" rx="4" />
            <text x="750" y="472" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="500">Feet</text>
            
            <rect x="680" y="495" width="140" height="35" fill="white" stroke="#3b82f6" strokeWidth="1.5" rx="4" />
            <text x="750" y="517" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="500">Hands</text>
            
            {/* Lighting Hint */}
            <rect x="680" y="550" width="140" height="40" fill="white" stroke="#d1d5db" strokeWidth="2" rx="4" />
            <text x="750" y="574" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="500">Lighting Hint</text>
            
            {/* Alignment Guide */}
            <rect x="680" y="600" width="140" height="40" fill="white" stroke="#d1d5db" strokeWidth="2" rx="4" />
            <text x="750" y="624" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="500">Alignment guide</text>
          </g>

          {/* Arrows from Main Interface to Right Side */}
          <line x1="630" y1="480" x2="680" y2="430" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* BOTTOM FLOW - User Interactions */}
          <g id="bottom-flow">
            {/* Video Box */}
            <rect x="150" y="700" width="120" height="60" fill="white" stroke="#d1d5db" strokeWidth="2" rx="4" />
            <text x="210" y="735" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="500">Video</text>
            
            {/* Share/Save Box */}
            <rect x="290" y="700" width="140" height="60" fill="white" stroke="#d1d5db" strokeWidth="2" rx="4" />
            <text x="310" y="720" textAnchor="start" fontSize="11" fill="#374151">• Share</text>
            <text x="310" y="740" textAnchor="start" fontSize="11" fill="#374151">• Save to gallery</text>
            
            {/* Face/Body Tracking Box */}
            <rect x="450" y="700" width="140" height="60" fill="white" stroke="#d1d5db" strokeWidth="2" rx="4" />
            <text x="520" y="720" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="500">face outline</text>
            <text x="520" y="740" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="500">body skeleton</text>
            
            {/* Before/After Box */}
            <rect x="610" y="700" width="120" height="60" fill="white" stroke="#d1d5db" strokeWidth="2" rx="4" />
            <text x="670" y="735" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="500">Before/After</text>
          </g>

          {/* Arrows from Main Interface to Bottom Flow */}
          <line x1="240" y1="640" x2="210" y2="700" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="360" y1="640" x2="360" y2="700" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="480" y1="640" x2="520" y2="700" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="590" y1="640" x2="670" y2="700" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* FINAL OVERLAY FLOW - Try-on Overlay Selection */}
          <g id="overlay-flow">
            {/* Try-on Overlay Title */}
            <rect x="880" y="320" width="160" height="30" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" rx="4" />
            <text x="960" y="340" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="600">Try-on Overlay</text>
            
            {/* Arrow */}
            <line x1="960" y1="350" x2="960" y2="380" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
            
            {/* Overlay Menu */}
            <rect x="880" y="380" width="160" height="160" fill="white" stroke="#d1d5db" strokeWidth="2" rx="4" />
            
            <text x="900" y="405" textAnchor="start" fontSize="12" fill="#374151">• watch</text>
            <text x="900" y="430" textAnchor="start" fontSize="12" fill="#374151">• glasses</text>
            <text x="900" y="455" textAnchor="start" fontSize="12" fill="#374151">• lipstick</text>
            <text x="900" y="480" textAnchor="start" fontSize="12" fill="#374151">• shoes</text>
          </g>

          {/* Arrow from Mode Selection to Overlay */}
          <line x1="820" y1="430" x2="880" y2="430" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* Connection from Product Page to Overlay */}
          <path d="M 500 145 Q 700 145 700 320" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />

          {/* Legend/Notes */}
          <g id="legend" transform="translate(880, 580)">
            <rect x="0" y="0" width="160" height="100" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1" rx="4" />
            <text x="10" y="20" fontSize="11" fill="#6b7280" fontWeight="600">Legend:</text>
            <line x1="10" y1="35" x2="40" y2="35" stroke="#3b82f6" strokeWidth="2" />
            <text x="50" y="40" fontSize="10" fill="#6b7280">Primary flow</text>
            <line x1="10" y1="55" x2="40" y2="55" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
            <text x="50" y="60" fontSize="10" fill="#6b7280">Secondary flow</text>
            <rect x="10" y="70" width="30" height="15" fill="#3b82f6" stroke="#2563eb" strokeWidth="1" rx="2" />
            <text x="50" y="82" fontSize="10" fill="#6b7280">Action button</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
