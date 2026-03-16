import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  MoreHorizontal
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function NotePage() {
  const location = useLocation();
  const isSyntheticBio = location.pathname.includes('synthetic-bio');
  
  const [content, setContent] = useState(
    isSyntheticBio 
      ? `# chapter 1

i am testing the app lets see

• these are bullet points
• testing

## a monthly guide

_a monthly guide_

this is a quote

this is a numbered list

1. hey
2. luke
3. [Luke]`
      : '/'
  );

  const [showToolbar, setShowToolbar] = useState(false);

  const ToolbarButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
    <button 
      className="p-2 rounded-lg hover:bg-[var(--hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-all duration-200"
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="flex-1 flex h-full bg-[var(--background)] overflow-hidden">
      {/* Sidebar with pages list */}
      <div className="w-64 border-r border-[var(--border)] bg-[var(--background-secondary)] flex flex-col">
        <div className="px-4 py-4 border-b border-[var(--border)]">
          <h2 className="text-[15px] font-semibold text-[var(--foreground)]">Uni</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <a 
              href="/uni/synthetic-bio"
              className={`block px-3 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                isSyntheticBio 
                  ? 'bg-[var(--accent)] text-white' 
                  : 'text-[var(--foreground-secondary)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]'
              }`}
            >
              <div className="font-medium">synthetic bio</div>
              <div className="text-[11px] opacity-60 truncate mt-0.5">
                chapter 1 i am testing the app...
              </div>
            </a>
            <a 
              href="/uni/untitled"
              className={`block px-3 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                !isSyntheticBio 
                  ? 'bg-[var(--accent)] text-white' 
                  : 'text-[var(--foreground-secondary)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]'
              }`}
            >
              <div className="font-medium">Untitled</div>
              <div className="text-[11px] opacity-60 truncate mt-0.5">/...</div>
            </a>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="px-8 py-3 border-b border-[var(--border-light)] flex items-center gap-1">
          <ToolbarButton icon={Heading1} label="Heading 1" />
          <ToolbarButton icon={Heading2} label="Heading 2" />
          <ToolbarButton icon={Heading3} label="Heading 3" />
          <div className="w-px h-6 bg-[var(--border)] mx-1" />
          <ToolbarButton icon={Bold} label="Bold" />
          <ToolbarButton icon={Italic} label="Italic" />
          <ToolbarButton icon={Code} label="Code" />
          <div className="w-px h-6 bg-[var(--border)] mx-1" />
          <ToolbarButton icon={List} label="Bullet List" />
          <ToolbarButton icon={ListOrdered} label="Numbered List" />
          <div className="w-px h-6 bg-[var(--border)] mx-1" />
          <ToolbarButton icon={ImageIcon} label="Insert Image" />
          <ToolbarButton icon={LinkIcon} label="Insert Link" />
          <div className="ml-auto" />
          <ToolbarButton icon={MoreHorizontal} label="More" />
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Untitled"
              className="w-full text-[32px] font-bold text-[var(--foreground)] bg-transparent border-none outline-none mb-6 placeholder:text-[var(--foreground-tertiary)]"
              defaultValue={isSyntheticBio ? 'Synthetic Biology - Chapter 1' : 'Untitled'}
            />
            
            {isSyntheticBio ? (
              <div className="space-y-6">
                {/* Introduction */}
                <h1 className="text-[28px] font-bold text-[var(--foreground)] mt-8 mb-4">
                  Introduction to Synthetic Biology
                </h1>
                
                <p className="text-[17px] leading-[1.7] text-[var(--foreground)]">
                  Synthetic biology is an interdisciplinary field that combines biology, engineering, and computer science to design and construct new biological parts, devices, and systems. Unlike traditional genetic engineering, which involves modifying existing organisms, synthetic biology aims to create entirely new biological systems from scratch.
                </p>

                {/* Divider */}
                <div className="border-t-2 border-[var(--border-light)] my-8" />

                {/* Key Concepts */}
                <h2 className="text-[22px] font-semibold text-[var(--foreground)] mt-8 mb-4">
                  Key Concepts
                </h2>

                <ul className="space-y-2 text-[17px] leading-[1.7] text-[var(--foreground)] ml-6">
                  <li className="flex items-start">
                    <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    <span><strong>Genetic Circuits:</strong> Networks of genes that work together to perform specific functions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    <span><strong>BioBricks:</strong> Standardized DNA sequences that can be assembled like Lego blocks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    <span><strong>Chassis Organisms:</strong> Host organisms used as platforms for synthetic systems</span>
                  </li>
                </ul>

                {/* Divider */}
                <div className="border-t-2 border-[var(--border-light)] my-8" />

                {/* Images Section */}
                <h2 className="text-[22px] font-semibold text-[var(--foreground)] mt-8 mb-4">
                  Laboratory Examples
                </h2>

                <div className="grid grid-cols-3 gap-4 my-6">
                  <div className="space-y-2">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1738778151587-032287ae9f90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeW50aGV0aWMlMjBiaW9sb2d5JTIwbGFib3JhdG9yeSUyMG1pY3Jvc2NvcGV8ZW58MXx8fHwxNzczNjMwNTY4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Microscope laboratory"
                      className="w-full h-48 object-cover rounded-lg border border-[var(--border-light)]"
                    />
                    <p className="text-[13px] text-[var(--foreground-secondary)] text-center">
                      Laboratory microscopy
                    </p>
                  </div>
                  <div className="space-y-2">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1560851552-233ecb65e276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxETkElMjBkb3VibGUlMjBoZWxpeCUyMHN0cnVjdHVyZXxlbnwxfHx8fDE3NzM2MzA1Njh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="DNA structure"
                      className="w-full h-48 object-cover rounded-lg border border-[var(--border-light)]"
                    />
                    <p className="text-[13px] text-[var(--foreground-secondary)] text-center">
                      DNA double helix
                    </p>
                  </div>
                  <div className="space-y-2">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1706204787068-82cf617dc5c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9sb2d5JTIwY2VsbHMlMjBwZXRyaSUyMGRpc2h8ZW58MXx8fHwxNzczNjMwNTY4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Cell culture"
                      className="w-full h-48 object-cover rounded-lg border border-[var(--border-light)]"
                    />
                    <p className="text-[13px] text-[var(--foreground-secondary)] text-center">
                      Cell culture samples
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-[var(--border-light)] my-8" />

                {/* Applications */}
                <h2 className="text-[22px] font-semibold text-[var(--foreground)] mt-8 mb-4">
                  Real-World Applications
                </h2>

                <ol className="space-y-3 text-[17px] leading-[1.7] text-[var(--foreground)] ml-6 list-decimal">
                  <li>
                    <strong>Medicine:</strong> Engineering bacteria to produce insulin and other therapeutic proteins
                  </li>
                  <li>
                    <strong>Environmental:</strong> Designing organisms to detect and clean up pollutants
                  </li>
                  <li>
                    <strong>Agriculture:</strong> Creating crops with enhanced nutritional value and pest resistance
                  </li>
                  <li>
                    <strong>Biofuels:</strong> Developing microorganisms that efficiently convert biomass to fuel
                  </li>
                </ol>

                {/* Divider */}
                <div className="border-t-2 border-[var(--border-light)] my-8" />

                {/* Important Note */}
                <h3 className="text-[18px] font-semibold text-[var(--foreground)] mt-6 mb-3">
                  Important Considerations
                </h3>

                <div className="bg-[var(--accent)]/10 border-l-4 border-[var(--accent)] p-4 rounded-r-lg">
                  <p className="text-[15px] leading-[1.7] text-[var(--foreground)]">
                    <strong>Ethical Implications:</strong> As we gain the ability to design and create new life forms, we must carefully consider the ethical implications. This includes biosafety concerns, potential environmental impacts, and questions about the definition and value of life itself.
                  </p>
                </div>

                {/* Code Block Example */}
                <h3 className="text-[18px] font-semibold text-[var(--foreground)] mt-8 mb-3">
                  Example: Gene Expression Formula
                </h3>

                <div className="bg-[var(--background-secondary)] border border-[var(--border-light)] rounded-lg p-4 font-mono text-[14px]">
                  <code className="text-[var(--foreground)]">
                    Rate of protein production = k * [mRNA]<br/>
                    where k is the translation rate constant<br/>
                    <br/>
                    d[Protein]/dt = k * [mRNA] - δ * [Protein]<br/>
                    where δ is the degradation rate
                  </code>
                </div>

                {/* Final Notes */}
                <div className="mt-8 p-6 bg-[var(--card)] border border-[var(--border-light)] rounded-lg">
                  <h4 className="text-[16px] font-semibold text-[var(--foreground)] mb-2">
                    Study Notes
                  </h4>
                  <p className="text-[15px] text-[var(--foreground-secondary)] leading-[1.7]">
                    Remember to review the central dogma of molecular biology (DNA → RNA → Protein) as this forms the foundation for understanding synthetic biology. Next class: We'll dive into CRISPR-Cas9 and gene editing techniques.
                  </p>
                </div>
              </div>
            ) : (
              <textarea
                className="w-full min-h-[600px] bg-transparent resize-none outline-none text-[17px] leading-[1.7] text-[var(--foreground)] placeholder:text-[var(--foreground-tertiary)] font-mono"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing..."
                spellCheck={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}