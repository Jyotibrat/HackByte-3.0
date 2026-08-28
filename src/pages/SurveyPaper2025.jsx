import { useEffect } from "react";
import "katex/dist/katex.min.css";
import "../styles/research.css";

// Components
import Header from "../components/research/Header";
import HighlightedSection from "../components/research/HighlightedSection";
import Picture from "../components/research/Picture";
import Video from "../components/research/Video";
import Figure from "../components/research/Figure";
import Wide from "../components/research/Wide";
import TwoColumns from "../components/research/TwoColumns";
import SmallCaps from "../components/research/SmallCaps";
import Table from "../components/research/Table";
import YouTubeVideo from "../components/research/YouTubeVideo";
import ModelViewer from "../components/research/ModelViewer";
import Comparison from "../components/research/Comparison";
import Carousel from "../components/research/Carousel";
import Tabs from "../components/research/tabs/Tabs";
import TabsList from "../components/research/tabs/TabsList";
import TabsTrigger from "../components/research/tabs/TabsTrigger";
import TabsContent from "../components/research/tabs/TabsContent";

// Assets
import dogsDiffc from "../assets/research/dogs-diffc.png";
import dogsTrue from "../assets/research/dogs-true.png";
import dogsMsillm from "../assets/research/dogs-msillm.jpg";
import outsideVideo from "../assets/research/outside.mp4";

// Inline KaTeX rendering helper
import { renderToString } from "katex";

function InlineMath({ tex }) {
  const html = renderToString(tex, { throwOnError: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function BlockMath({ tex }) {
  const html = renderToString(tex, { throwOnError: false, displayMode: true });
  return (
    <div
      className="katex-display"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function SurveyPaper2025() {
  // Apply data-theme to <html> so dark-mode CSS custom variant works
  useEffect(() => {
    const prev = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = "device";
    document.documentElement.classList.add("bg-white", "dark:bg-zinc-900");
    return () => {
      // Restore previous state on unmount
      if (prev) {
        document.documentElement.dataset.theme = prev;
      } else {
        delete document.documentElement.dataset.theme;
      }
      document.documentElement.classList.remove("bg-white", "dark:bg-zinc-900");
    };
  }, []);

  return (
    <div
      className="bg-white dark:bg-zinc-900"
      style={{ minHeight: "100vh" }}
    >
      {/* Body prose styles matching index.astro's <body> classes */}
      <div
        className={[
          "prose prose-lg prose-zinc dark:prose-invert",
          "prose-a:text-blue-600 prose-a:hover:text-blue-900",
          "dark:prose-a:text-blue-200 dark:prose-a:hover:text-blue-100",
          "prose-a:underline prose-a:decoration-dashed prose-a:underline-offset-4 prose-a:hover:decoration-solid prose-a:font-normal",
          "prose-code:bg-zinc-200 dark:prose-code:bg-zinc-800",
          "prose-code:text-zinc-800 dark:prose-code:text-zinc-200",
          "prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-medium",
          "prose-code:before:content-none prose-code:after:content-none",
          "max-w-none pt-16 pb-6 font-sans",
        ].join(" ")}
      >
        <main className="rp-main">

          {/* ── HEADER ──────────────────────────────────────────────────── */}
          <Header
            title="Academic Project Page Template"
            conference="Conference Name"
            authors={[
              {
                name: "Roman Hauksson",
                url: "https://roman.technology",
                institution: "University of Texas at Dallas",
                notes: ["*", "†"],
              },
              { name: "Author Two", institution: "Institution Two", notes: ["*", "†"] },
              { name: "Author Three", institution: "Institution Three", notes: ["*"] },
              { name: "Author Four", institution: "Institution Four" },
            ]}
            notes={[
              { symbol: "*", text: "author note one" },
              { symbol: "†", text: "author note two" },
            ]}
            links={[
              { name: "Paper", url: "https://github.com/RomanHauksson/academic-project-astro-template", icon: "ri:file-pdf-2-line" },
              { name: "Code",  url: "https://github.com/RomanHauksson/academic-project-astro-template", icon: "ri:github-line" },
              { name: "arXiv", url: "https://github.com/RomanHauksson/academic-project-astro-template", icon: "academicons:arxiv" },
              { name: "Slides", url: "https://github.com/RomanHauksson/academic-project-astro-template", icon: "ri:slideshow-2-line" },
            ]}
            background={
              <img
                src={dogsTrue}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 0,
                  margin: 0,
                  maxWidth: "none",
                  maxHeight: "none",
                }}
              />
            }
          />

          {/* ── ABSTRACT ────────────────────────────────────────────────── */}
          <HighlightedSection>
            <h2>Abstract</h2>
            <p>
              This is a template you can use to create a professional-looking,
              accessible, and performant project page for your research paper.{" "}
              <a href="https://github.com/RomanHauksson/academic-project-astro-template">
                See the code for the template and instructions on how to use it
                yourself on GitHub
              </a>
              . It&apos;s made with the{" "}
              <a href="https://astro.build/">Astro web framework</a> and styled
              with <a href="https://tailwindcss.com/">Tailwind</a>. You write
              the content in <a href="https://mdxjs.com/">MDX</a>, which enables
              markdown formatting like <strong>bold</strong>,{" "}
              <em>italics</em>, and{" "}
              <del>strikethrough</del>, as well as custom components like{" "}
              <SmallCaps>small caps.</SmallCaps>
            </p>
          </HighlightedSection>

          {/* ── VISUALS ─────────────────────────────────────────────────── */}
          <h2>Visuals</h2>

          <h3>Image</h3>
          <p>
            Use the <code>Picture</code> component to display images. If you
            have a figure in PDF format, you can pass in its path as the{" "}
            <code>src</code> prop and it will be converted into a web-friendly
            image automatically.
          </p>
          <Picture
            src={dogsDiffc}
            alt="Photo of two running dogs, lossily compressed using the DiffC algorithm"
          />

          <h3>Video</h3>
          <Video src={outsideVideo} />

          <h3>Wide visual</h3>
          <p>
            I constrained the maximum width of the text column to make sure
            it&apos;s readable even when the screen is wide. But images and
            other visuals should &ldquo;break out&rdquo; and take up more
            horizontal space: for this, try wrapping them in the{" "}
            <code>Wide</code> component.
          </p>
          <Wide>
            <Picture
              src={dogsDiffc}
              alt="Photo of two running dogs, lossily compressed using the DiffC algorithm"
            />
          </Wide>

          <h3>Figure with caption</h3>
          <p>
            Wrap a visual in a <code>Figure</code> component to add a caption.
          </p>
          <Figure
            figure={
              <Picture
                src={dogsDiffc}
                alt="Photo of two running dogs, lossily compressed using the DiffC algorithm"
              />
            }
            caption={
              <>
                A photo of two dogs running side-by-side in shallow water,
                lossily compressed using the{" "}
                <a href="https://jeremyiv.github.io/diffc-project-page/">
                  DiffC algorithm
                </a>
                .
              </>
            }
          />

          <h3>Comparison slider</h3>
          <p>
            Use the <code>Comparison</code> component to compare two visuals
            with an interactive slider.
          </p>
          <Comparison
            itemOne={
              <img
                src={dogsDiffc}
                alt="Photo of two running dogs, lossily compressed using the DiffC algorithm"
                className="w-full"
              />
            }
            itemTwo={
              <img
                src={dogsTrue}
                alt="True photo of two dogs running side-by-side in shallow water"
                className="w-full"
              />
            }
          />

          <h3>Tab panels</h3>
          <p>
            Tab panels are a great way to display a labeled collection of
            related visuals without taking up too much space.
          </p>
          <Tabs defaultValue="true">
            <TabsList>
              <TabsTrigger value="true">Ground truth</TabsTrigger>
              <TabsTrigger value="diffc">DiffC (Flux-dev)</TabsTrigger>
              <TabsTrigger value="msillm">MS-ILLM</TabsTrigger>
            </TabsList>
            <TabsContent value="true">
              <Picture
                src={dogsTrue}
                alt="True photo of two dogs running side-by-side in shallow water"
              />
            </TabsContent>
            <TabsContent value="diffc">
              <Picture
                src={dogsDiffc}
                alt="Photo of two running dogs, lossily compressed using the DiffC algorithm"
              />
            </TabsContent>
            <TabsContent value="msillm">
              <Picture
                src={dogsMsillm}
                alt="Photo of two running dogs, lossily compressed using MS-ILLM"
              />
            </TabsContent>
          </Tabs>

          <h3>Carousel</h3>
          <p>
            A carousel is another useful pattern for a collection of visuals
            that don&apos;t necessarily have meaningful labels.
          </p>
          <Carousel>
            <Picture
              src={dogsTrue}
              alt="True photo of two dogs running side-by-side in shallow water"
            />
            <Picture
              src={dogsDiffc}
              alt="Photo of two running dogs, lossily compressed using the DiffC algorithm"
            />
            <Picture
              src={dogsMsillm}
              alt="Photo of two running dogs, lossily compressed using MS-ILLM"
            />
          </Carousel>

          {/* ── TWO COLUMNS ─────────────────────────────────────────────── */}
          <h2>Two columns</h2>
          <p>
            Use the two columns component to display two columns of content. In
            this example, the first column contains a YouTube video embed and
            the second column contains an interactive 3D model viewer. By
            default, they display side by side, but if the screen is narrow
            enough (for example, on mobile), they&apos;re arranged vertically.
          </p>
          <TwoColumns
            left={<YouTubeVideo videoId="wjZofJX0v4M" />}
            right={
              <ModelViewer
                src="/research/BoxVertexColors.glb"
                alt="A cube colored with a rainbow gradient"
              />
            }
          />

          {/* ── LATEX ───────────────────────────────────────────────────── */}
          <h2>
            <InlineMath tex="\LaTeX" />
          </h2>
          <p>
            You can also add <InlineMath tex="\LaTeX" /> formulas, rendered
            client-side using{" "}
            <a href="https://katex.org/">
              <InlineMath tex="\KaTeX" />
            </a>
            . You can write them inline, like this:{" "}
            <InlineMath tex="a^2 + b^2 = c^2" />. Or, you can write them as a
            block:
          </p>
          <BlockMath tex="\int_a^b f(x)\, dx" />

          {/* ── CITATION TEXT ───────────────────────────────────────────── */}
          <h2>Citation</h2>
          <p>
            If you copy your bibliography into <code>./bibliography.bib</code>,
            you can cite papers using their BibTeX keys, and they&apos;ll be
            automatically formatted and included in the bibliography section at
            the end. For example: [Vaswani et al., 2017]. Note that these
            citations are distinct from footnotes.
          </p>

          {/* ── TABLE ───────────────────────────────────────────────────── */}
          <h2>Table</h2>
          <p>
            Add simple tables using{" "}
            <a href="https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables">
              GitHub Flavored Markdown syntax
            </a>
            :
          </p>
          <Table>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Model</th>
                <th style={{ textAlign: "center" }}>Accuracy</th>
                <th style={{ textAlign: "center" }}>F1 score</th>
                <th style={{ textAlign: "center" }}>Training time (hours)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BERT-base</td>
                <td style={{ textAlign: "center" }}>0.89</td>
                <td style={{ textAlign: "center" }}>0.87</td>
                <td style={{ textAlign: "center" }}>4.5</td>
              </tr>
              <tr>
                <td>RoBERTa-large</td>
                <td style={{ textAlign: "center" }}>0.92</td>
                <td style={{ textAlign: "center" }}>0.91</td>
                <td style={{ textAlign: "center" }}>7.2</td>
              </tr>
              <tr>
                <td>DistilBERT</td>
                <td style={{ textAlign: "center" }}>0.86</td>
                <td style={{ textAlign: "center" }}>0.84</td>
                <td style={{ textAlign: "center" }}>2.1</td>
              </tr>
              <tr>
                <td>XLNet</td>
                <td style={{ textAlign: "center" }}>0.90</td>
                <td style={{ textAlign: "center" }}>0.89</td>
                <td style={{ textAlign: "center" }}>6.8</td>
              </tr>
            </tbody>
          </Table>

          {/* ── BIBTEX ──────────────────────────────────────────────────── */}
          <h2>BibTeX citation</h2>
          <p>
            Displaying the BibTeX entry for your paper in a code block makes it
            easy to copy and paste.
          </p>
          <pre className="bg-zinc-200 dark:bg-zinc-800 rounded-lg p-4 overflow-x-auto text-sm">
            <code>{`@misc{roman2024academic,
  author = "{Roman Hauksson}",
  title = "Academic Project Page Template",
  year = "2024",
  howpublished = "\\url{https://research-template.roman.technology}",
}`}</code>
          </pre>

          {/* ── BIBLIOGRAPHY ────────────────────────────────────────────── */}
          <h2>Bibliography</h2>
          <div className="csl-entry">
            Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L.,
            Gomez, A. N., Kaiser, Ł., &amp; Polosukhin, I. (2017).{" "}
            <em>Attention is all you need.</em> Advances in Neural Information
            Processing Systems, 30.{" "}
            <a href="https://arxiv.org/abs/1706.03762">
              https://arxiv.org/abs/1706.03762
            </a>
          </div>

        </main>

        {/* Footer */}
        <footer className="mx-auto max-w-[50rem] px-6 text-center">
          <p className="text-sm text-center text-zinc-500">
            Built with{" "}
            <a
              href="https://research-template.roman.technology"
              rel="nofollow"
              className="text-blue-600 dark:text-blue-200"
            >
              Roman Hauksson-Neill&apos;s project page template
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
