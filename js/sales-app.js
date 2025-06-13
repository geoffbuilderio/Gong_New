/**
 * Builder.io Sales Intelligence Platform
 * Main JavaScript functionality for prospect research and demo generation
 */

class SalesIntelligencePlatform {
  constructor() {
    this.currentStep = 1;
    this.prospectData = {};
    this.init();
  }

  init() {
    this.bindEvents();
    this.initializeApp();
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.switchTab(e));
    });

    // Main action buttons
    document
      .getElementById("analyze-btn")
      .addEventListener("click", () => this.analyzeProspect());
    document
      .getElementById("generate-recommendation")
      .addEventListener("click", () => this.generateRecommendation());
    document
      .getElementById("generate-landing-page")
      .addEventListener("click", () => this.generateLandingPage());

    // Preview controls
    document
      .getElementById("preview-page")
      .addEventListener("click", () => this.previewPage());
    document
      .getElementById("download-page")
      .addEventListener("click", () => this.downloadPage());
    document
      .getElementById("share-page")
      .addEventListener("click", () => this.sharePage());

    // Device preview buttons
    document.querySelectorAll(".device-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.switchDevice(e));
    });

    // Color picker changes
    document
      .getElementById("primary-color")
      .addEventListener("change", () => this.updatePreview());
    document
      .getElementById("secondary-color")
      .addEventListener("change", () => this.updatePreview());
    document
      .getElementById("template-base")
      .addEventListener("change", () => this.updatePreview());

    // Modal controls
    document
      .querySelector(".modal-close")
      .addEventListener("click", () => this.closeModal());
    document
      .getElementById("copy-link")
      .addEventListener("click", () => this.copyShareLink());

    // Progress step navigation
    document.querySelectorAll(".progress-step").forEach((step) => {
      step.addEventListener("click", (e) => this.navigateToStep(e));
    });
  }

  initializeApp() {
    this.showSection(1);
    this.updateProgressIndicator(1);
  }

  // Tab Management
  switchTab(e) {
    const tabName = e.target.dataset.tab;

    // Update tab buttons
    document
      .querySelectorAll(".tab-btn")
      .forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    // Update tab content
    document
      .querySelectorAll(".tab-content")
      .forEach((content) => content.classList.remove("active"));
    document.getElementById(`${tabName}-tab`).classList.add("active");
  }

  // Step Navigation
  showSection(step) {
    document
      .querySelectorAll(".sales-section")
      .forEach((section) => section.classList.remove("active"));

    if (step === 1)
      document.getElementById("prospect-input").classList.add("active");
    else if (step === 2)
      document.getElementById("research-results").classList.add("active");
    else if (step === 3)
      document.getElementById("product-recommendation").classList.add("active");
    else if (step === 4)
      document.getElementById("landing-page-generator").classList.add("active");

    this.currentStep = step;
    this.updateProgressIndicator(step);
  }

  navigateToStep(e) {
    const step = parseInt(e.currentTarget.dataset.step);
    if (step <= this.currentStep) {
      this.showSection(step);
    }
  }

  updateProgressIndicator(activeStep) {
    document.querySelectorAll(".progress-step").forEach((step, index) => {
      if (index + 1 <= activeStep) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  // Prospect Analysis
  async analyzeProspect() {
    const analyzeBtn = document.getElementById("analyze-btn");
    const urlInput = document.getElementById("prospect-url");
    const companyInput = document.getElementById("company-name");

    // Get input value based on active tab
    const activeTab = document.querySelector(".tab-btn.active").dataset.tab;
    const inputValue =
      activeTab === "url" ? urlInput.value : companyInput.value;

    if (!inputValue || inputValue.trim() === "") {
      alert("Please enter a valid URL or company name");
      return;
    }

    // Basic URL validation for URL tab
    if (activeTab === "url") {
      const urlPattern =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
      const simpleUrlPattern =
        /^[\da-z\.-]+\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;

      if (!urlPattern.test(inputValue) && !simpleUrlPattern.test(inputValue)) {
        alert(
          "Please enter a valid website URL (e.g., example.com or https://example.com)",
        );
        return;
      }
    }

    // Show loading state
    analyzeBtn.classList.add("loading");
    analyzeBtn.disabled = true;

    try {
      // Simulate API call delay
      await this.delay(3000);

      // Generate mock prospect data
      this.prospectData = this.generateMockProspectData(inputValue, activeTab);

      // Populate research results
      this.populateResearchResults();

      // Move to next step
      this.showSection(2);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      analyzeBtn.classList.remove("loading");
      analyzeBtn.disabled = false;
    }
  }

  generateMockProspectData(input, type) {
    // Mock data generation based on input
    const companies = {
      "shopify.com": {
        name: "Shopify",
        logo: "https://cdn.shopify.com/shopifycloud/brochure/assets/logo/shopify-logo-primary-color-800c82958b47596cdd09c75b2af48bb88f9151b02caccee4176a4eaaca398575.svg",
        status: "Public Company",
        employees: "10,000+",
        revenue: "$5.6B",
        traffic: "2.1B monthly visits",
        techStack: [
          "React",
          "Node.js",
          "GraphQL",
          "Liquid",
          "Ruby on Rails",
          "PostgreSQL",
        ],
        composableScore: 85,
        goals: [
          "Expand international market presence",
          "Improve developer experience and platform flexibility",
          "Enhance mobile commerce capabilities",
          "Strengthen enterprise-grade security",
        ],
      },
      "stripe.com": {
        name: "Stripe",
        logo: "https://stripe.com/img/v3/home/social.png",
        status: "Private Company",
        employees: "4,000+",
        revenue: "$12B valuation",
        traffic: "45M monthly visits",
        techStack: ["React", "TypeScript", "Ruby", "Go", "Scala", "MongoDB"],
        composableScore: 95,
        goals: [
          "Global payment infrastructure expansion",
          "API-first development approach",
          "Enhanced fraud detection and security",
          "Support for emerging payment methods",
        ],
      },
      "google.com": {
        name: "Google",
        logo: "https://logo.clearbit.com/google.com",
        status: "Public Company",
        employees: "150,000+",
        revenue: "$280B",
        traffic: "92B monthly visits",
        techStack: ["Angular", "TypeScript", "Go", "Python", "Kubernetes"],
        composableScore: 95,
        goals: [
          "AI-first product development",
          "Cloud infrastructure expansion",
          "Privacy-focused innovation",
          "Sustainable technology solutions",
        ],
      },
      "microsoft.com": {
        name: "Microsoft",
        logo: "https://logo.clearbit.com/microsoft.com",
        status: "Public Company",
        employees: "220,000+",
        revenue: "$211B",
        traffic: "1.7B monthly visits",
        techStack: ["Azure", "TypeScript", "C#", ".NET", "React"],
        composableScore: 90,
        goals: [
          "Cloud-first strategy",
          "AI and machine learning integration",
          "Developer productivity tools",
          "Enterprise digital transformation",
        ],
      },
      default: {
        name:
          type === "company"
            ? input
            : input.replace(/^https?:\/\/(www\.)?/, "").split(".")[0],
        logo: "https://via.placeholder.com/60x60?text=LOGO",
        status: "Private Company",
        employees: "500-1,000",
        revenue: "$50M-100M",
        traffic: "1M monthly visits",
        techStack: ["WordPress", "PHP", "MySQL", "jQuery", "Apache"],
        composableScore: 45,
        goals: [
          "Digital transformation initiative",
          "Improve website performance and user experience",
          "Modernize technology stack",
          "Increase online presence and conversion rates",
        ],
      },
    };

    let domain;
    if (type === "url") {
      try {
        // Add protocol if missing
        let urlToProcess = input;
        if (!input.startsWith("http://") && !input.startsWith("https://")) {
          urlToProcess = "https://" + input;
        }
        domain = new URL(urlToProcess).hostname.replace("www.", "");
      } catch (error) {
        console.warn("Invalid URL provided, using fallback:", input);
        // Fallback: extract domain-like string from input
        domain = input
          .replace(/^https?:\/\/(www\.)?/, "")
          .split("/")[0]
          .split("?")[0];
      }
    } else {
      domain = `${input.toLowerCase().replace(/\s+/g, "")}.com`;
    }

    const companyData = companies[domain] || {
      ...companies.default,
      name: type === "company" ? input : companies.default.name,
    };

    // If no specific logo URL is provided, try to generate one from the domain
    if (
      companyData.logo === "https://via.placeholder.com/60x60?text=LOGO" &&
      type === "url"
    ) {
      companyData.logo = this.generateLogoUrl(domain);
    }

    return companyData;
  }

  populateResearchResults() {
    const data = this.prospectData;

    // Company overview with logo error handling
    const logoImg = document.getElementById("company-logo");
    logoImg.src = data.logo;
    logoImg.onerror = () => {
      // Fallback to Google favicon service if Clearbit fails
      logoImg.src = `https://www.google.com/s2/favicons?domain=${this.extractDomainFromData(data)}&sz=64`;

      // If that also fails, use a generated avatar
      logoImg.onerror = () => {
        logoImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&size=60&background=00d4ff&color=fff&bold=true`;
      };
    };

    document.getElementById("company-name-display").textContent = data.name;
    document.getElementById("company-status").textContent = data.status;
    document.getElementById("employee-count").textContent = data.employees;
    document.getElementById("revenue-estimate").textContent = data.revenue;
    document.getElementById("traffic-estimate").textContent = data.traffic;

    // Tech stack
    const techList = document.getElementById("tech-stack-list");
    techList.innerHTML = "";
    data.techStack.forEach((tech) => {
      const techItem = document.createElement("span");
      techItem.className = "tech-item";
      if (
        [
          "React",
          "Node.js",
          "GraphQL",
          "TypeScript",
          "Next.js",
          "Gatsby",
        ].includes(tech)
      ) {
        techItem.classList.add("composable");
      }
      techItem.textContent = tech;
      techList.appendChild(techItem);
    });

    document.getElementById("composable-score").textContent =
      `${data.composableScore}/100`;

    // Business goals
    const goalsList = document.getElementById("business-goals-list");
    goalsList.innerHTML = "";
    data.goals.forEach((goal) => {
      const li = document.createElement("li");
      li.textContent = goal;
      goalsList.appendChild(li);
    });
  }

  // Product Recommendation
  async generateRecommendation() {
    const generateBtn = document.getElementById("generate-recommendation");
    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    try {
      await this.delay(2000);

      const recommendation = this.analyzeProductFit();
      this.populateRecommendation(recommendation);
      this.showSection(3);
    } catch (error) {
      console.error("Recommendation generation failed:", error);
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = "Generate Product Recommendation";
    }
  }

  analyzeProductFit() {
    const score = this.prospectData.composableScore;
    const hasComposableTech = this.prospectData.techStack.some((tech) =>
      [
        "React",
        "Node.js",
        "GraphQL",
        "TypeScript",
        "Next.js",
        "Gatsby",
      ].includes(tech),
    );

    if (score >= 70 || hasComposableTech) {
      return {
        product: "fusion",
        name: "Builder.io Fusion",
        tagline: "The Future of Visual Development",
        reasons: [
          "High composable architecture compatibility",
          "Existing modern tech stack alignment",
          "Developer-friendly API-first approach",
          "Advanced visual editing capabilities needed",
        ],
        valueProposition: {
          strategic: [
            "Accelerate time-to-market for new features",
            "Reduce dependency on development resources",
            "Enable rapid experimentation and iteration",
          ],
          operational: [
            "Streamline content management workflows",
            "Improve collaboration between teams",
            "Reduce technical debt and maintenance overhead",
          ],
          tactical: [
            "Drag-and-drop visual editor",
            "Real-time preview and editing",
            "Component library integration",
          ],
        },
      };
    } else {
      return {
        product: "publish",
        name: "Builder.io Publish",
        tagline: "Headless CMS for Modern Websites",
        reasons: [
          "Perfect for traditional CMS migration",
          "Simplified content management needs",
          "Cost-effective headless solution",
          "Easy integration with existing systems",
        ],
        valueProposition: {
          strategic: [
            "Modernize content infrastructure",
            "Improve website performance and SEO",
            "Enable omnichannel content delivery",
          ],
          operational: [
            "Centralized content management",
            "Improved content governance",
            "Faster content publishing workflows",
          ],
          tactical: [
            "Intuitive content editor",
            "API-driven content delivery",
            "Built-in SEO optimization",
          ],
        },
      };
    }
  }

  populateRecommendation(recommendation) {
    // Product display
    const productDisplay = document.getElementById("recommended-product");
    productDisplay.innerHTML = `
            <div class="product-name">${recommendation.name}</div>
            <div class="product-tagline">${recommendation.tagline}</div>
        `;

    // Reasons
    const reasonsList = document.getElementById("recommendation-reasons-list");
    reasonsList.innerHTML = "";
    recommendation.reasons.forEach((reason) => {
      const li = document.createElement("li");
      li.textContent = reason;
      reasonsList.appendChild(li);
    });

    // Value pyramid
    this.populateValuePyramid(recommendation.valueProposition);

    // Store recommendation for later use
    this.prospectData.recommendation = recommendation;
  }

  populateValuePyramid(valueProposition) {
    const strategic = document.getElementById("strategic-value");
    const operational = document.getElementById("operational-value");
    const tactical = document.getElementById("tactical-value");

    [strategic, operational, tactical].forEach((list) => (list.innerHTML = ""));

    valueProposition.strategic.forEach((value) => {
      const li = document.createElement("li");
      li.textContent = value;
      strategic.appendChild(li);
    });

    valueProposition.operational.forEach((value) => {
      const li = document.createElement("li");
      li.textContent = value;
      operational.appendChild(li);
    });

    valueProposition.tactical.forEach((value) => {
      const li = document.createElement("li");
      li.textContent = value;
      tactical.appendChild(li);
    });
  }

  // Landing Page Generation
  async generateLandingPage() {
    const generateBtn = document.getElementById("generate-landing-page");
    generateBtn.disabled = true;
    generateBtn.textContent = "Creating Demo Page...";

    try {
      await this.delay(2000);
      this.showSection(4);
      this.generateInitialPreview();
    } catch (error) {
      console.error("Landing page generation failed:", error);
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = "Create Personalized Demo Page";
    }
  }

  generateInitialPreview() {
    const primaryColor = document.getElementById("primary-color").value;
    const secondaryColor = document.getElementById("secondary-color").value;
    const template = document.getElementById("template-base").value;

    this.updatePreview();
  }

  updatePreview() {
    const primaryColor = document.getElementById("primary-color").value;
    const secondaryColor = document.getElementById("secondary-color").value;
    const template = document.getElementById("template-base").value;
    const data = this.prospectData;

    const previewHtml = this.generatePreviewHTML(
      data,
      primaryColor,
      secondaryColor,
      template,
    );

    const iframe = document.getElementById("page-preview");
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(previewHtml);
    doc.close();
  }

  generatePreviewHTML(data, primaryColor, secondaryColor, template) {
    const productName = template === "fusion" ? "Fusion" : "Publish";
    const productTagline =
      template === "fusion"
        ? "The Future of Visual Development"
        : "Headless CMS for Modern Websites";

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Builder.io ${productName} - ${data.name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Lexend', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #1D2639;
        }
        .container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .header {
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            color: white;
            padding: 20px 0;
        }
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            height: 40px;
            background: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 700;
            color: ${primaryColor};
        }
        .nav { display: flex; gap: 32px; }
        .nav a { color: white; text-decoration: none; font-weight: 500; }
        .hero {
            background: linear-gradient(180deg, ${primaryColor}10 0%, ${secondaryColor}10 100%);
            padding: 80px 0;
            text-align: center;
        }
        .hero h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 24px;
            background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 40px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .cta-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-bottom: 40px;
        }
        .btn {
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
        }
        .btn-primary {
            background: ${primaryColor};
            color: white;
            border: 2px solid ${primaryColor};
        }
        .btn-secondary {
            background: transparent;
            color: ${primaryColor};
            border: 2px solid ${primaryColor};
        }
        .btn:hover { transform: translateY(-2px); }
        .company-integration {
            background: white;
            padding: 32px;
            border-radius: 16px;
            margin: 40px auto;
            max-width: 600px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border: 2px solid ${secondaryColor};
        }
        .company-logo {
            width: 60px;
            height: 60px;
            object-fit: contain;
            margin-bottom: 16px;
        }
        .features { padding: 80px 0; background: #f8fafc; }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            margin-top: 48px;
        }
        .feature-card {
            background: white;
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            border-top: 4px solid ${primaryColor};
        }
        .feature-card h3 {
            color: ${primaryColor};
            margin-bottom: 16px;
        }
        .footer {
            background: ${primaryColor};
            color: white;
            padding: 40px 0;
            text-align: center;
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .features-grid { grid-template-columns: 1fr; }
            .cta-buttons { flex-direction: column; align-items: center; }
            .header-content { flex-direction: column; gap: 16px; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">Builder.io</div>
                <nav class="nav">
                    <a href="#">Product</a>
                    <a href="#">Solutions</a>
                    <a href="#">Pricing</a>
                </nav>
            </div>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h1>Builder.io ${productName} for ${data.name}</h1>
            <p>${productTagline} - Designed specifically for companies like ${data.name}</p>

            <div class="cta-buttons">
                <a href="#" class="btn btn-primary">Start Free Trial</a>
                <a href="#" class="btn btn-secondary">Book Demo</a>
            </div>

            <div class="company-integration">
                <img src="${data.logo}" alt="${data.name} Logo" class="company-logo">
                <h3>Perfect for ${data.name}</h3>
                <p>With ${data.employees} employees and ${data.traffic}, ${data.name} needs a solution that scales. Builder.io ${productName} provides the perfect balance of power and simplicity.</p>
            </div>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 16px;">Why ${data.name} Needs Builder.io ${productName}</h2>
            <p style="text-align: center; font-size: 1.25rem; color: #4A5468;">Tailored benefits based on your company's profile and goals</p>

            <div class="features-grid">
                ${data.recommendation.valueProposition.tactical
                  .map(
                    (benefit) => `
                    <div class="feature-card">
                        <h3>${benefit.split(" ").slice(0, 2).join(" ")}</h3>
                        <p>${benefit}</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Builder.io. Personalized demo for ${data.name}.</p>
        </div>
    </footer>
</body>
</html>`;
  }

  // Device Preview
  switchDevice(e) {
    const device = e.target.dataset.device;
    const previewFrame = document.querySelector(".preview-frame");

    document
      .querySelectorAll(".device-btn")
      .forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    previewFrame.className = `preview-frame ${device}`;
  }

  // Page Actions
  previewPage() {
    window.open("about:blank", "_blank");
    // In a real implementation, this would open the generated page in a new tab
  }

  downloadPage() {
    const primaryColor = document.getElementById("primary-color").value;
    const secondaryColor = document.getElementById("secondary-color").value;
    const template = document.getElementById("template-base").value;

    const html = this.generatePreviewHTML(
      this.prospectData,
      primaryColor,
      secondaryColor,
      template,
    );

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.prospectData.name}-builder-demo.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  sharePage() {
    const shareLink = `https://demos.builder.io/${this.prospectData.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
    document.getElementById("share-link").value = shareLink;
    document.getElementById("page-views").textContent = "0";
    document.getElementById("generation-date").textContent =
      new Date().toLocaleDateString();

    this.showModal();
  }

  showModal() {
    document.getElementById("share-modal").classList.add("active");
  }

  closeModal() {
    document.getElementById("share-modal").classList.remove("active");
  }

  copyShareLink() {
    const shareLink = document.getElementById("share-link");
    shareLink.select();
    document.execCommand("copy");

    const copyBtn = document.getElementById("copy-link");
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  }

  // Logo Generation Method
  generateLogoUrl(domain) {
    // Try multiple logo sources
    const logoSources = [
      `https://logo.clearbit.com/${domain}`,
      `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      `https://${domain}/favicon.ico`,
    ];

    // Return the first available logo source (Clearbit API is most reliable)
    return logoSources[0];
  }

  // Extract domain from prospect data for fallback logo purposes
  extractDomainFromData(data) {
    // Try to determine domain from company name
    const companyName = data.name.toLowerCase();
    if (companyName.includes("shopify")) return "shopify.com";
    if (companyName.includes("stripe")) return "stripe.com";
    if (companyName.includes("google")) return "google.com";
    if (companyName.includes("microsoft")) return "microsoft.com";
    if (companyName.includes("amazon")) return "amazon.com";
    if (companyName.includes("apple")) return "apple.com";

    // Fallback: generate domain from company name
    return `${companyName.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "")}.com`;
  }

  // Utility Methods
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SalesIntelligencePlatform();
});

// Additional utility functions for enhanced functionality
function extractDomainFromUrl(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return null;
  }
}

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}
