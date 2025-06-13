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
    const data = this.prospectData;
    const score = data.composableScore;
    const techStack = data.techStack;
    const revenue = this.parseRevenue(data.revenue);
    const employees = this.parseEmployees(data.employees);

    // Enhanced analysis criteria
    const hasModernFrameworks = techStack.some((tech) =>
      [
        "React",
        "Vue",
        "Angular",
        "Svelte",
        "Next.js",
        "Nuxt.js",
        "Gatsby",
      ].includes(tech),
    );

    const hasHeadlessTech = techStack.some((tech) =>
      ["GraphQL", "REST API", "Strapi", "Contentful", "Sanity"].includes(tech),
    );

    const hasJamstackTech = techStack.some((tech) =>
      ["Vercel", "Netlify", "JAMstack", "Static Site"].includes(tech),
    );

    const isEnterprise = employees >= 1000 || revenue >= 100000000;
    const isGrowthStage = employees >= 100 || revenue >= 10000000;

    // Decision matrix for product recommendation
    let fusionScore = 0;
    let publishScore = 0;

    // Technical readiness scoring
    if (score >= 80) fusionScore += 3;
    else if (score >= 60) fusionScore += 2;
    else if (score >= 40) publishScore += 2;
    else publishScore += 3;

    if (hasModernFrameworks) fusionScore += 2;
    if (hasHeadlessTech) fusionScore += 2;
    if (hasJamstackTech) fusionScore += 1;

    // Legacy tech indicators
    if (
      techStack.some((tech) => ["WordPress", "Drupal", "Joomla"].includes(tech))
    ) {
      publishScore += 2;
    }

    // Company size and maturity
    if (isEnterprise) fusionScore += 2;
    if (isGrowthStage) fusionScore += 1;

    // Industry-specific logic
    if (
      data.goals.some(
        (goal) =>
          goal.toLowerCase().includes("personalization") ||
          goal.toLowerCase().includes("a/b test") ||
          goal.toLowerCase().includes("experiment"),
      )
    ) {
      fusionScore += 2;
    }

    if (
      data.goals.some(
        (goal) =>
          goal.toLowerCase().includes("content") ||
          goal.toLowerCase().includes("cms") ||
          goal.toLowerCase().includes("publish"),
      )
    ) {
      publishScore += 1;
    }

    // Make the final recommendation
    if (fusionScore > publishScore) {
      return {
        product: "fusion",
        name: "Builder.io Fusion",
        tagline: "The Future of Visual Development",
        confidence: Math.min(95, 60 + fusionScore * 5),
        reasons: [
          `High technical readiness (${score}/100 composable score)`,
          hasModernFrameworks
            ? "Modern framework stack detected"
            : "Ready for framework modernization",
          isEnterprise
            ? "Enterprise-scale requirements"
            : "Growth-stage development needs",
          "Advanced personalization and optimization capabilities needed",
        ],
        valueProposition: {
          strategic: [
            "Accelerate time-to-market for new features by 60%",
            "Reduce dependency on development resources",
            "Enable rapid experimentation and A/B testing",
            "Scale visual content creation across teams",
          ],
          operational: [
            "Streamline design-to-code workflows",
            "Improve collaboration between designers and developers",
            "Reduce technical debt and maintenance overhead",
            "Enable real-time content personalization",
          ],
          tactical: [
            "Drag-and-drop visual editor with code generation",
            "Real-time preview and collaborative editing",
            "Component library integration and design tokens",
            "Advanced A/B testing and optimization tools",
          ],
        },
        hubspotInsights: this.getHubSpotInsights(data.name, "fusion"),
      };
    } else {
      return {
        product: "publish",
        name: "Builder.io Publish",
        tagline: "Headless CMS for Modern Websites",
        confidence: Math.min(95, 60 + publishScore * 5),
        reasons: [
          score < 60
            ? "Traditional tech stack - perfect migration path"
            : "Solid foundation for headless transition",
          "Content-focused business requirements",
          "Cost-effective modernization approach",
          "Easy integration with existing systems",
        ],
        valueProposition: {
          strategic: [
            "Modernize content infrastructure without full rebuild",
            "Improve website performance and SEO rankings",
            "Enable omnichannel content delivery",
            "Future-proof content management approach",
          ],
          operational: [
            "Centralized content management across channels",
            "Improved content governance and workflows",
            "Faster content publishing and updates",
            "Better content analytics and insights",
          ],
          tactical: [
            "Intuitive visual content editor",
            "API-driven content delivery",
            "Built-in SEO optimization tools",
            "Multi-language and localization support",
          ],
        },
        hubspotInsights: this.getHubSpotInsights(data.name, "publish"),
      };
    }
  }

  // Helper methods for better analysis
  parseRevenue(revenueStr) {
    if (!revenueStr) return 0;
    const numStr = revenueStr.replace(/[^0-9.]/g, "");
    const num = parseFloat(numStr);
    if (revenueStr.includes("B")) return num * 1000000000;
    if (revenueStr.includes("M")) return num * 1000000;
    if (revenueStr.includes("K")) return num * 1000;
    return num;
  }

  parseEmployees(employeeStr) {
    if (!employeeStr) return 0;
    const numStr = employeeStr.replace(/[^0-9]/g, "");
    return parseInt(numStr) || 0;
  }

  // HubSpot integration for sales intelligence
  getHubSpotInsights(companyName, recommendedProduct) {
    // This would integrate with HubSpot API in a real implementation
    // For now, return mock insights based on common sales patterns
    return {
      pastInteractions: this.generateMockHubSpotData(companyName),
      salesStage: this.determineSalesStage(companyName),
      contactHistory: this.getMockContactHistory(companyName),
      dealProbability: this.calculateDealProbability(recommendedProduct),
      nextActions: this.suggestNextActions(recommendedProduct),
    };
  }

  generateMockHubSpotData(companyName) {
    const interactions = [
      'Downloaded "Headless CMS Guide" 2 weeks ago',
      'Attended "Modern Web Development" webinar',
      "Visited pricing page 3 times this month",
      'Engaged with email campaign: "Visual Development Tools"',
    ];
    return interactions.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  determineSalesStage(companyName) {
    const stages = ["Research", "Evaluation", "Negotiation", "Decision"];
    return stages[Math.floor(Math.random() * stages.length)];
  }

  getMockContactHistory(companyName) {
    return {
      lastContact: "5 days ago",
      contactCount: Math.floor(Math.random() * 8) + 1,
      preferredChannel: ["Email", "Phone", "Demo Request"][
        Math.floor(Math.random() * 3)
      ],
    };
  }

  calculateDealProbability(product) {
    const baseProbability = product === "fusion" ? 75 : 85;
    return baseProbability + Math.floor(Math.random() * 15) - 7; // ±7% variance
  }

  suggestNextActions(product) {
    if (product === "fusion") {
      return [
        "Schedule technical demo focusing on visual development",
        "Share case study: Enterprise visual editing success",
        "Arrange architect call to discuss integration",
        "Provide ROI calculator for development time savings",
      ];
    } else {
      return [
        "Demo headless CMS migration path",
        "Share content management ROI analysis",
        "Provide technical integration guide",
        "Schedule content strategy consultation",
      ];
    }
  }

  populateRecommendation(recommendation) {
    // Product display with confidence score
    const productDisplay = document.getElementById("recommended-product");
    productDisplay.innerHTML = `
            <div class="product-name">${recommendation.name}</div>
            <div class="product-tagline">${recommendation.tagline}</div>
            <div class="confidence-score">
                <span class="confidence-label">Recommendation Confidence:</span>
                <span class="confidence-value">${recommendation.confidence}%</span>
            </div>
        `;

    // Reasons with HubSpot insights
    const reasonsList = document.getElementById("recommendation-reasons-list");
    reasonsList.innerHTML = "";
    recommendation.reasons.forEach((reason) => {
      const li = document.createElement("li");
      li.textContent = reason;
      reasonsList.appendChild(li);
    });

    // Add HubSpot insights if available
    if (recommendation.hubspotInsights) {
      const hubspotSection = document.createElement("div");
      hubspotSection.className = "hubspot-insights";
      hubspotSection.innerHTML = `
                <h5>Sales Intelligence (HubSpot)</h5>
                <div class="insights-grid">
                    <div class="insight-item">
                        <span class="insight-label">Sales Stage:</span>
                        <span class="insight-value">${recommendation.hubspotInsights.salesStage}</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-label">Deal Probability:</span>
                        <span class="insight-value">${recommendation.hubspotInsights.dealProbability}%</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-label">Last Contact:</span>
                        <span class="insight-value">${recommendation.hubspotInsights.contactHistory.lastContact}</span>
                    </div>
                </div>
                <div class="recent-interactions">
                    <h6>Recent Interactions:</h6>
                    <ul>
                        ${recommendation.hubspotInsights.pastInteractions
                          .map((interaction) => `<li>${interaction}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="next-actions">
                    <h6>Suggested Next Actions:</h6>
                    <ul>
                        ${recommendation.hubspotInsights.nextActions
                          .slice(0, 3)
                          .map((action) => `<li>${action}</li>`)
                          .join("")}
                    </ul>
                </div>
            `;

      const recommendationCard = document.querySelector(".recommendation-card");
      recommendationCard.appendChild(hubspotSection);
    }

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

    if (!data || !data.recommendation) {
      console.warn("No prospect data available for preview");
      return;
    }

    try {
      const previewHtml = this.generatePreviewHTML(
        data,
        primaryColor,
        secondaryColor,
        template,
      );

      const iframe = document.getElementById("page-preview");

      // Ensure iframe is ready
      iframe.onload = () => {
        console.log("Preview updated successfully");
      };

      // Create a blob URL for the HTML content
      const blob = new Blob([previewHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      iframe.src = url;

      // Clean up the blob URL after a delay
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Error updating preview:", error);
      const iframe = document.getElementById("page-preview");
      iframe.src =
        'data:text/html;charset=utf-8,<html><body style="font-family: Poppins, sans-serif; padding: 40px; text-align: center; background: rgb(0,0,0); color: rgb(255,255,255);"><h2>Preview Error</h2><p>Unable to generate preview. Please ensure you have completed the recommendation step.</p></body></html>';
    }
  }

  generatePreviewHTML(data, primaryColor, secondaryColor, template) {
    const recommendation = data.recommendation;
    if (!recommendation) {
      console.error("No recommendation data available");
      return "<html><body><h1>Error: No recommendation data</h1></body></html>";
    }

    const productName = recommendation.name;
    const productTagline = recommendation.tagline;
    const isPublish = recommendation.product === "publish";

    // Use Builder.io colors if custom colors aren't provided
    const brandPrimary =
      primaryColor === "#6339F5" ? "rgb(172, 126, 244)" : primaryColor;
    const brandSecondary =
      secondaryColor === "#00D0AB"
        ? isPublish
          ? "rgb(239, 108, 65)"
          : "rgb(24, 182, 246)"
        : secondaryColor;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName} Demo - Personalized for ${data.name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif;
            line-height: 1.6;
            background: rgb(0, 0, 0);
            color: rgb(255, 255, 255);
        }
        .container { max-width: 1120px; margin: 0 auto; padding: 0 40px; }

        .header {
            background: rgb(0, 0, 0);
            padding: 20px 0;
            border-bottom: 1px solid rgb(58, 58, 58);
        }
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            height: 40px;
            background: rgb(255, 255, 255);
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 700;
            color: rgb(0, 0, 0);
            text-decoration: none;
        }
        .nav { display: flex; gap: 32px; }
        .nav a { color: rgb(255, 255, 255); text-decoration: none; font-weight: 500; opacity: 0.8; }
        .nav a:hover { opacity: 1; }

        .hero {
            padding: 120px 0;
            text-align: center;
        }
        .hero-badge {
            display: inline-block;
            background: rgba(172, 126, 244, 0.1);
            border: 1px solid ${brandPrimary};
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            color: ${brandPrimary};
            margin-bottom: 24px;
            letter-spacing: 2px;
        }
        .hero h1 {
            font-size: 56px;
            font-weight: 700;
            margin-bottom: 24px;
            line-height: 1.1;
            letter-spacing: -1px;
        }
        .hero p {
            font-size: 19px;
            margin-bottom: 40px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            opacity: 0.9;
        }
        .cta-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-bottom: 60px;
        }
        .btn {
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
            font-size: 16px;
        }
        .btn-primary {
            background: rgb(255, 255, 255);
            color: rgb(0, 0, 0);
            border: none;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255,255,255,0.3);
        }
        .btn-secondary {
            background: transparent;
            color: rgb(255, 255, 255);
            border: 2px solid rgb(255, 255, 255);
        }
        .btn-secondary:hover {
            background: rgb(255, 255, 255);
            color: rgb(0, 0, 0);
        }

        .company-showcase {
            background: rgb(0, 0, 0);
            padding: 60px 40px;
            margin: 60px auto;
            max-width: 800px;
            border-radius: 16px;
            border: 1px solid rgb(58, 58, 58);
            text-align: center;
        }
        .company-logo {
            width: 80px;
            height: 80px;
            object-fit: contain;
            margin-bottom: 24px;
            border-radius: 12px;
        }
        .company-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-top: 32px;
        }
        .stat-item {
            text-align: center;
        }
        .stat-value {
            font-size: 24px;
            font-weight: 700;
            color: ${brandPrimary};
            display: block;
        }
        .stat-label {
            font-size: 14px;
            opacity: 0.7;
            margin-top: 4px;
        }

        .value-section {
            padding: 120px 0;
            background: rgb(0, 0, 0);
        }
        .section-badge {
            display: inline-block;
            background: rgba(${isPublish ? "239, 108, 65" : "24, 182, 246"}, 0.1);
            border: 1px solid ${brandSecondary};
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            color: ${brandSecondary};
            margin-bottom: 16px;
            letter-spacing: 1px;
        }
        .value-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            margin-top: 60px;
        }
        .value-card {
            background: rgb(0, 0, 0);
            padding: 40px;
            border-radius: 16px;
            border: 1px solid rgb(58, 58, 58);
            transition: all 0.3s ease;
        }
        .value-card:hover {
            border-color: ${brandPrimary};
            transform: translateY(-4px);
        }
        .value-card h3 {
            color: ${brandPrimary};
            margin-bottom: 16px;
            font-size: 18px;
            font-weight: 600;
        }
        .value-card p {
            opacity: 0.9;
            line-height: 1.6;
        }

        .why-section {
            padding: 120px 0;
            background: rgb(0, 0, 0);
        }
        .why-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 60px;
            margin-top: 60px;
            align-items: center;
        }
        .why-content h3 {
            font-size: 32px;
            margin-bottom: 24px;
            color: rgb(255, 255, 255);
        }
        .why-list {
            list-style: none;
        }
        .why-list li {
            padding: 12px 0;
            border-bottom: 1px solid rgb(58, 58, 58);
            opacity: 0.9;
        }
        .why-list li:before {
            content: "✓";
            color: ${brandSecondary};
            font-weight: bold;
            margin-right: 12px;
        }

        .footer {
            background: rgb(0, 0, 0);
            border-top: 1px solid rgb(58, 58, 58);
            padding: 60px 0;
            text-align: center;
        }
        .footer p {
            opacity: 0.7;
        }

        @media (max-width: 768px) {
            .hero h1 { font-size: 36px; }
            .value-grid, .why-grid { grid-template-columns: 1fr; }
            .cta-buttons { flex-direction: column; align-items: center; }
            .header-content { flex-direction: column; gap: 16px; }
            .company-stats { grid-template-columns: 1fr; }
            .container { padding: 0 20px; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="#" class="logo">Builder.io</a>
                <nav class="nav">
                    <a href="#">Platform</a>
                    <a href="#">Solutions</a>
                    <a href="#">Resources</a>
                    <a href="#">Pricing</a>
                </nav>
            </div>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <div class="hero-badge">${isPublish ? "BUILDER PUBLISH" : "BUILDER FUSION"}</div>
            <h1>${data.name} + ${productName}</h1>
            <p>${productTagline} tailored for ${data.name}'s ${data.employees} team and ${data.traffic} monthly visitors</p>

            <div class="cta-buttons">
                <a href="#" class="btn btn-primary">Book Your Demo</a>
                <a href="#" class="btn btn-secondary">View Case Studies</a>
            </div>

            <div class="company-showcase">
                <img src="${data.logo}" alt="${data.name} Logo" class="company-logo" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9InJnYigxNzIsIDEyNiwgMjQ0KSIvPgo8dGV4dCB4PSI0MCIgeT0iNDgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPiR7ZGF0YS5uYW1lLmNoYXJBdCgwKX08L3RleHQ+Cjwvc3ZnPgo='; this.onerror=null;">
                <h3>Built specifically for ${data.name}</h3>
                <p>Based on your current tech stack and business goals, ${productName} is the perfect fit for your ${data.composableScore >= 70 ? "modern" : "evolving"} architecture.</p>

                <div class="company-stats">
                    <div class="stat-item">
                        <span class="stat-value">${data.employees}</span>
                        <div class="stat-label">Team Size</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${data.traffic}</span>
                        <div class="stat-label">Monthly Traffic</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${data.composableScore}/100</span>
                        <div class="stat-label">Readiness Score</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="value-section">
        <div class="container">
            <div class="section-badge">${isPublish ? "HEADLESS CMS" : "VISUAL EDITOR"}</div>
            <h2 style="text-align: center; font-size: 48px; margin-bottom: 16px; font-weight: 700;">Strategic Value for ${data.name}</h2>
            <p style="text-align: center; font-size: 19px; opacity: 0.8; max-width: 600px; margin: 0 auto;">Based on your research data and business objectives</p>

            <div class="value-grid">
                ${recommendation.valueProposition.strategic
                  .map(
                    (value, index) => `
                    <div class="value-card">
                        <h3>Strategic Impact ${index + 1}</h3>
                        <p>${value}</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    </section>

    <section class="why-section">
        <div class="container">
            <div class="why-grid">
                <div class="why-content">
                    <h3>Why ${productName} for ${data.name}?</h3>
                    <ul class="why-list">
                        ${recommendation.reasons.map((reason) => `<li>${reason}</li>`).join("")}
                    </ul>
                </div>
                <div class="why-content">
                    <h3>Immediate Benefits</h3>
                    <ul class="why-list">
                        ${recommendation.valueProposition.operational
                          .slice(0, 4)
                          .map((benefit) => `<li>${benefit}</li>`)
                          .join("")}
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Builder.io. Personalized ${productName} demo for ${data.name} — Generated by ABX Intelligence</p>
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
    if (!this.prospectData || !this.prospectData.recommendation) {
      alert("Please complete the recommendation step before downloading");
      return;
    }

    const primaryColor = document.getElementById("primary-color").value;
    const secondaryColor = document.getElementById("secondary-color").value;
    const template = document.getElementById("template-base").value;

    try {
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
      a.download = `${this.prospectData.name.replace(/[^a-zA-Z0-9]/g, "-")}-${this.prospectData.recommendation.product}-demo.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Show success message
      setTimeout(() => {
        alert("Demo page downloaded successfully!");
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download demo page. Please try again.");
    }
  }

  sharePage() {
    // Generate the actual HTML content
    const primaryColor = document.getElementById("primary-color").value;
    const secondaryColor = document.getElementById("secondary-color").value;
    const template = document.getElementById("template-base").value;

    const htmlContent = this.generatePreviewHTML(
      this.prospectData,
      primaryColor,
      secondaryColor,
      template,
    );

    // Create a unique demo ID
    const demoId = `${this.prospectData.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

    // Store the demo data in localStorage (in production, this would be saved to a database)
    const demoData = {
      id: demoId,
      html: htmlContent,
      prospectName: this.prospectData.name,
      product: this.prospectData.recommendation.product,
      createdAt: new Date().toISOString(),
      views: 0,
    };

    localStorage.setItem(`demo_${demoId}`, JSON.stringify(demoData));

    // Create the shareable URL (in production, this would be your actual domain)
    const baseUrl =
      window.location.origin +
      window.location.pathname.replace("index.html", "");
    const shareLink = `${baseUrl}demo.html?id=${demoId}`;

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
