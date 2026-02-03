
import { Tool } from './types';

export const TOOLS: Tool[] = [
  // --- GETTING STARTED ---
  { 
    id: 'ready-to-print', 
    name: 'Ready to Print', 
    description: 'Enhance and upscale design resolution without pixelation.', 
    icon: '✂️', 
    tag: 'Popular', 
    category: 'GETTING STARTED',
    bgImage: 'https://images.unsplash.com/photo-1520032484190-e5ef81d87978?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload your low-resolution textile design.",
        "Select the 'Scale Factor' (e.g., 2X, 4X).",
        "Adjust 'Creativity' if you want AI to add fine textures.",
        "Click Submit to generate a print-ready file."
      ],
      tips: ["Use for designs below 1000px for best results.", "Keep Creativity low (below 30%) to maintain original look."],
      bestFor: "Upscaling blurry or low-quality source images for production."
    }
  },
  { 
    id: 'anti-blur', 
    name: 'Anti-Blur', 
    description: 'Another upscaler but cleans the design from blurry textures into crisp quality designs.', 
    icon: '🔍', 
    tag: 'Popular', 
    category: 'GETTING STARTED',
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload a blurry or scanned image.",
        "Select 'Advanced' mode for deeper cleaning.",
        "Set 'Resemblance' to 80% to keep the motif shape.",
        "Submit and wait for neural sharpening."
      ],
      tips: ["Excellent for cleaning up old hand-painted sketches.", "Works best on high-contrast patterns."],
      bestFor: "Removing soft edges and digital noise from scans."
    }
  },
  { 
    id: 'repeat-set', 
    name: 'Repeat Set', 
    description: 'Convert designs into seamless repeating patterns.', 
    icon: '🔄', 
    tag: 'Popular', 
    category: 'GETTING STARTED',
    bgImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload a single motif or a non-repeating square.",
        "Choose the repeat type (Grid, Half-Drop).",
        "Enable 'Seamless Blend' in advanced settings.",
        "Click Submit to get the tileable design."
      ],
      tips: ["Ensure your motif isn't cut off at the edges before uploading.", "High creativity helps blend edges naturally."],
      bestFor: "Creating yardage designs for continuous fabric printing."
    }
  },
  { 
    id: 'dress-to-design', 
    name: 'Dress to Design', 
    description: 'Extract 2D flat designs from mockup/dresses/garments.', 
    icon: '👕', 
    tag: 'Popular', 
    category: 'GETTING STARTED',
    bgImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload a photo of a person wearing a garment or a 3D mockup.",
        "The AI will identify the fabric area.",
        "Perspective correction is applied automatically.",
        "The flattened 2D design is extracted as a new image."
      ],
      tips: ["Use clear, front-facing photos with minimal folds.", "Bright lighting helps extract cleaner patterns."],
      bestFor: "Competitor analysis or recreating designs from reference garments."
    }
  },

  // --- DESIGN MAKING ---
  { 
    id: 'design-creation', 
    name: 'Design Creation', 
    description: 'Generate new objects and motifs with AI.', 
    icon: '✨', 
    tag: 'Trending', 
    category: 'DESIGN MAKING',
    bgImage: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Type a detailed prompt (e.g., 'Hand-painted watercolor roses in pastel pink').",
        "Optionally upload a style reference image.",
        "Set 'Creativity' to 70%+ for unique artistic results.",
        "Submit to generate a set of motifs."
      ],
      tips: ["Be specific about the medium (watercolor, digital, ink).", "Mention color palettes for better consistency."],
      bestFor: "Brainstorming new design elements from scratch."
    }
  },
  { 
    id: 'design-creation-old', 
    name: 'Design Creation (Old)', 
    description: 'Generate new objects and motifs with Legacy AI.', 
    icon: '🕰️', 
    category: 'DESIGN MAKING',
    bgImage: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Enter your prompt in the directive box.",
        "Set creativity to moderate levels.",
        "Submit for reliable pattern generation using our v1 engine."
      ],
      tips: ["Better for classic geometric shapes.", "Faster processing than the new engine."],
      bestFor: "Quick sketches and simple motifs."
    }
  },
  { 
    id: 'design-generation', 
    name: 'Design Generation', 
    description: 'Create AI-powered designs from design and style prompts.', 
    icon: '🎨', 
    category: 'DESIGN MAKING',
    bgImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Enter your concept in the prompt box.",
        "Define the layout (e.g., 'scattered', 'directional', 'geometric').",
        "Select your desired Aspect Ratio.",
        "Submit for a complete pattern composition."
      ],
      tips: ["Try 'mood' words like 'vintage', 'modern', 'ethnic'.", "Combine multiple styles for unique look."],
      bestFor: "Fast-tracking the creative phase for seasonal collections."
    }
  },
  { 
    id: 'color-matching', 
    name: 'Color Matching', 
    description: 'Create multiple color variants of your design.', 
    icon: '🌈', 
    category: 'DESIGN MAKING',
    bgImage: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload your base design.",
        "Specify a target palette or theme (e.g., 'Tropical Sunset').",
        "Set 'Resemblance' high to keep motifs untouched.",
        "Generate various colorway options."
      ],
      tips: ["Upload a palette image to match colors exactly.", "Use for developing different SKU variants."],
      bestFor: "Developing color coordinates for a single design motif."
    }
  },
  { 
    id: 'sketch-to-design', 
    name: 'Sketch to Design', 
    description: 'Convert sketches and line art into colorful designs.', 
    icon: '🖌️', 
    category: 'DESIGN MAKING',
    bgImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecea8f82?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload a clean black-and-white sketch.",
        "Describe how you want it colored (e.g., 'Vibrant silk embroidery style').",
        "Adjust creativity to let AI interpret the lines.",
        "Submit to see the rendered design."
      ],
      tips: ["Remove shadows from the sketch photo before uploading.", "Doodle-style sketches work best with high creativity."],
      bestFor: "Digitizing hand-drawn concepts into production files."
    }
  },
  { 
    id: 'design-extension', 
    name: 'Design Extension', 
    description: 'Extend your designs to create more complex patterns.', 
    icon: '📐', 
    category: 'DESIGN MAKING',
    bgImage: 'https://images.unsplash.com/photo-1524169220946-12efd782aab4?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload a partial design.",
        "Select the direction of extension.",
        "AI outpaints the design while maintaining style.",
        "Review and download the expanded canvas."
      ],
      tips: ["Great for creating border matches.", "Keep resemblance high for perfect continuity."],
      bestFor: "Enlarging small patterns to full fabric width."
    }
  },

  // --- SEPARATION TOOLS ---
  { 
    id: 'spot-separation', 
    name: 'Spot Separation', 
    description: 'Professional color separation (All Colors) into Spot Channels (PSD).', 
    icon: '🖨️', 
    tag: 'New', 
    category: 'SEPARATION TOOLS',
    bgImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload your design.",
        "AI isolates colors into distinct Spot Channels.",
        "All distinct colors are captured and separated.",
        "Download as PSD with Channels."
      ],
      tips: ["Ideal for screen printing.", "Generates flat color plates."],
      bestFor: "Screen print production and color separation."
    }
  },
  { 
    id: 'color-layering', 
    name: 'Color Layering', 
    description: 'Standard color layer separation.', 
    icon: '🎭', 
    tag: 'Beta', 
    category: 'SEPARATION TOOLS',
    bgImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload a multi-color design.",
        "Specify the number of colors to separate.",
        "The AI generates individual alpha-masked layers.",
        "Download as a ZIP containing separated PNGs."
      ],
      tips: ["Works best on designs with distinct, flat colors.", "High-resolution inputs result in cleaner edges."],
      bestFor: "Preparing files for screen printing and rotary printing."
    }
  },
  { 
    id: 'object-layering', 
    name: 'Object Layering', 
    description: 'Separate motifs and backgrounds automatically.', 
    icon: '🔳', 
    category: 'SEPARATION TOOLS',
    bgImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload a complex pattern.",
        "AI identifies different motifs (flowers, leaves, dots).",
        "Each object is placed on a transparent layer.",
        "Download individual motif assets."
      ],
      tips: ["Good for deconstructing old vintage patterns.", "Use 'Advanced' mode for overlapping motifs."],
      bestFor: "Re-composing existing designs into new layouts."
    }
  },
  { 
    id: 'background-removal', 
    name: 'Background Removal', 
    description: 'Remove backgrounds with precision.', 
    icon: '✂️', 
    category: 'SEPARATION TOOLS',
    bgImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload the image.",
        "Wait for automatic subject detection.",
        "Fine-tune the edges in preview if needed.",
        "Download your transparent PNG."
      ],
      tips: ["Ensure clear contrast between the motif and background.", "Avoid very complex lace edges for best auto-results."],
      bestFor: "Isolating motifs for placement designs."
    }
  },
  { 
    id: 'watermark-removal', 
    name: 'Watermark Removal', 
    description: 'Clean and remove unwanted marks.', 
    icon: '🧼', 
    category: 'SEPARATION TOOLS',
    bgImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload the watermarked design.",
        "Select the areas with marks using the focus tool.",
        "AI heals the texture beneath the marks.",
        "Submit for a clean high-res design."
      ],
      tips: ["Works best on repeating patterns.", "Repeat the process for very dense watermarks."],
      bestFor: "Cleaning up historical scans and archival designs."
    }
  },
  { 
    id: 'vectorizer', 
    name: 'Vectorizer', 
    description: 'Convert PNG images to scalable vector graphics.', 
    icon: '📈', 
    category: 'SEPARATION TOOLS',
    bgImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload your raster design.",
        "Choose path smoothness level.",
        "Submit to convert to SVG/EPS paths.",
        "Download the vector package."
      ],
      tips: ["Use high-contrast inputs.", "Excellent for geometric and block patterns."],
      bestFor: "Creating infinitely scalable files for large format printing."
    }
  },
  { 
    id: 'patch-tool', 
    name: 'Patch Tool', 
    description: 'Generate patch layers from designs - Motif, Embroidery, and Border silhouettes.', 
    icon: '🧩', 
    tag: 'New', 
    category: 'SEPARATION TOOLS',
    bgImage: 'https://images.unsplash.com/photo-1506806732259-39c2d4ad6881?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Select your main motif.",
        "Define the patch border style.",
        "Submit to generate separate embroidery-ready files.",
        "Download the silhouette and detail maps."
      ],
      tips: ["Works best on isolated PNG motifs.", "Enable 'Embroidery Texture' for realistic previews."],
      bestFor: "Designing embroidered patches and appliques."
    }
  },

  // --- EFFECTS & OUTLINES ---
  { 
    id: 'scanned-fabric-removal', 
    name: 'Scanned Fabric Texture Removal', 
    description: 'Remove fabric texture while maintaining design and color patterns.', 
    icon: '🧶', 
    tag: 'Trending', 
    category: 'EFFECTS & OUTLINES',
    bgImage: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload a scan of physical fabric.",
        "AI separates the weave texture from the printed color.",
        "Apply 'Flatten' filter to smooth the surface.",
        "Submit for the digital print file."
      ],
      tips: ["Great for recovering designs from old fabric swatches.", "Maintains color fidelity perfectly."],
      bestFor: "Digital archiving of physical textile samples."
    }
  },
  { 
    id: '3d-effect', 
    name: '3D Animation', 
    description: 'Animate designs with 3D depth, cloth physics, and lighting.', 
    icon: '🎥', 
    category: 'EFFECTS & OUTLINES',
    bgImage: 'https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload a 2D flat design.",
        "Specify the animation style (e.g., 'Floating silk in wind').",
        "Wait for the Veo engine to render the physics.",
        "Download the MP4 video loop."
      ],
      tips: ["Use high contrast patterns for better depth perception.", "The process takes about 60 seconds for high-quality rendering."],
      bestFor: "Social media showcases and virtual fashion shows."
    }
  },
  { 
    id: 'border-outline', 
    name: 'Border Outline', 
    description: 'Add borders and outlines to your designs.', 
    icon: '🖼️', 
    category: 'EFFECTS & OUTLINES',
    bgImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload your isolated motif.",
        "Set the outline width and color.",
        "Choose style (Solid, Dashed, Neon).",
        "Submit to process."
      ],
      tips: ["Use on PNGs with transparency for best results.", "Works well for creating sticker-style motifs."],
      bestFor: "Adding decorative elements to placement prints."
    }
  },
  { 
    id: 'color-transfer', 
    name: 'Color Transfer', 
    description: 'Transfer color palettes between designs.', 
    icon: '📤', 
    category: 'EFFECTS & OUTLINES',
    bgImage: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload your 'Target' design.",
        "Upload a 'Source' image with the desired colors.",
        "AI re-maps the colors while keeping shapes.",
        "Submit for the synchronized result."
      ],
      tips: ["Use high-contrast source images for better palette extraction.", "Set creativity low to avoid motif warping."],
      bestFor: "Creating consistent color stories across different patterns."
    }
  },
  { 
    id: 'style-transfer', 
    name: 'Style Transfer', 
    description: 'Apply artistic styles to your designs.', 
    icon: '🎭', 
    tag: 'Updated', 
    category: 'EFFECTS & OUTLINES',
    bgImage: 'https://images.unsplash.com/photo-1514195037031-83d60ed3b448?auto=format&fit=crop&q=80&w=400',
    guide: {
      steps: [
        "Upload your design.",
        "Describe the target style (e.g., 'Van Gogh brushstrokes' or 'Bauhaus geometric').",
        "Adjust creativity for artistic freedom.",
        "Submit to re-render the design."
      ],
      tips: ["Try mixing contemporary patterns with classical art styles.", "Use for quick trend-based style updates."],
      bestFor: "Repurposing old designs into new trending aesthetics."
    }
  }
];
