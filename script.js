/* ==========================================================================
   ANUPRIYA S — AI & FULL STACK DEVELOPER PORTFOLIO
   Interactive Engine & AI Simulators
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. NEURAL NETWORK CONSTELLATION CANVAS
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 85);
    const connectionDistance = 130;
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.4 ? 'rgba(139, 92, 246,' : 'rgba(6, 182, 212,';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse avoidance/attraction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + ' 0.8)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color + ' 0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.22})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* --------------------------------------------------------------------------
     2. TYPEWRITER EFFECT
     -------------------------------------------------------------------------- */
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const roles = [
      "AI & Machine Learning Systems",
      "Full Stack Web Development",
      "Ollama & Llama 3.2 Architectures",
      "NLP & Patent Trend Analytics",
      "CSE Student @ SNS (9.33 CGPA)",
      "High-Performance API Solutions"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at full word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400; // Pause before typing next
      }

      setTimeout(type, typeSpeed);
    }
    setTimeout(type, 800);
  }

  /* --------------------------------------------------------------------------
     3. TAB SWITCHER (DEMO SECTION)
     -------------------------------------------------------------------------- */
  const demoTabs = document.querySelectorAll('.demo-tab-btn');
  const demoPanels = document.querySelectorAll('.demo-panel');

  demoTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      demoTabs.forEach((b) => b.classList.remove('active'));
      demoPanels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  /* --------------------------------------------------------------------------
     4. CAREERPILOT AI (SLACK SIMULATOR ENGINE)
     -------------------------------------------------------------------------- */
  const slackChatBody = document.getElementById('slackChatBody');
  const slackChatForm = document.getElementById('slackChatForm');
  const slackUserInput = document.getElementById('slackUserInput');
  const clearChatBtn = document.getElementById('clearChatBtn');
  const promptPills = document.querySelectorAll('.prompt-pill');

  const knowledgeBase = {
    roadmap: {
      title: "6-Month AI & Machine Learning Roadmap",
      text: `<p>🚀 <strong>Here is your 6-Month Structured AI Engineer Roadmap:</strong></p>
      <ul>
        <li><strong>Months 1-2: Foundations</strong> — Python mastery (NumPy, Pandas), Linear Algebra, Calculus, OOP architecture.</li>
        <li><strong>Month 3: Classical Machine Learning</strong> — Scikit-learn, Regression, Decision Trees, Ensembles, model evaluation metrics.</li>
        <li><strong>Month 4: Deep Learning & Neural Nets</strong> — PyTorch/TensorFlow, CNNs, RNNs, text tokenization, embeddings.</li>
        <li><strong>Month 5: Modern NLP & Large Language Models</strong> — Transformer attention mechanisms, HuggingFace, local LLM deployment with <strong>Ollama & Llama 3.2</strong>.</li>
        <li><strong>Month 6: Production & Full Stack Deployment</strong> — Flask/FastAPI REST backends, vector databases (Chroma/FAISS), Slack bot integration, Docker.</li>
      </ul>
      <p>💡 <em>Tip: Build end-to-end projects like AI Patent Explorer to stand out!</em></p>`
    },
    interview: {
      title: "Top Python & NLP Interview Questions",
      text: `<p>🎯 <strong>Key Technical Questions for AI & Python roles:</strong></p>
      <ul>
        <li><strong>Python Internals:</strong> How does Python's GIL impact multithreading, and when do you use multiprocessing or async I/O?</li>
        <li><strong>Data Structures:</strong> What is the time complexity difference between a Python <code>dict</code> and <code>collections.defaultdict</code> during key lookups?</li>
        <li><strong>NLP Core:</strong> Explain the difference between TF-IDF and dense vector embeddings (like Word2Vec or Transformer embeddings).</li>
        <li><strong>LLM Inference:</strong> What are the advantages of running quantized models (e.g. Llama 3.2 3B via Ollama) locally vs calling cloud APIs?</li>
        <li><strong>REST & Architecture:</strong> How does Slack Bolt Socket Mode handle events without requiring a public reverse proxy or ngrok?</li>
      </ul>`
    },
    project: {
      title: "High-Impact AI Project Concepts",
      text: `<p>💡 <strong>Innovative Project Ideas to Boost Your Portfolio:</strong></p>
      <ul>
        <li><strong>1. Multi-Modal Medical Assistant:</strong> Combine image segmentation models for X-rays with local LLMs to generate clinician draft reports.</li>
        <li><strong>2. Real-Time Neural Stream Decoder:</strong> Inspired by Brain-Computer Interfaces, build a streaming pipeline that categorizes simulated EEG waves.</li>
        <li><strong>3. Autonomous Code Reviewer Bot:</strong> A Slack or GitHub bot utilizing Ollama + Llama 3.2 to lint PRs, flag security vulnerabilities, and propose AST refactors.</li>
        <li><strong>4. Legal & Patent Trend Forecaster:</strong> Clustering patent claims with vector similarity to predict market patent wars before they occur.</li>
      </ul>`
    },
    resume: {
      title: "Tech Resume Optimization Strategy",
      text: `<p>📄 <strong>High-Conversion Tips for Software & AI Resumes:</strong></p>
      <ul>
        <li><strong>Quantify Outcomes:</strong> Replace generic statements with metrics (e.g., <em>"Engineered Flask web interface reducing patent search latency by 45%"</em>).</li>
        <li><strong>Highlight Academic Standing:</strong> Anupriya's <strong>9.33 CGPA</strong> is an immediate differentiator—keep it prominent near the top.</li>
        <li><strong>Demonstrate System Breadth:</strong> Pair AI models with real delivery tools (Flask, Slack API, REST, Git) to prove production readiness.</li>
        <li><strong>Showcase Research:</strong> Spotlight conference/symposium papers (like the CIT Brain-Computer Interface presentation).</li>
      </ul>`
    }
  };

  function appendUserMessage(msg) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgEl = document.createElement('div');
    msgEl.className = 'slack-message user-message';
    msgEl.innerHTML = `
      <div class="avatar user-avatar">👤</div>
      <div class="message-content">
        <div class="message-sender">
          <span class="name">You</span>
          <span class="timestamp">${time}</span>
        </div>
        <div class="message-text">
          <p>${escapeHtml(msg)}</p>
        </div>
      </div>
    `;
    slackChatBody.appendChild(msgEl);
    slackChatBody.scrollTop = slackChatBody.scrollHeight;
  }

  function appendBotTypingIndicator() {
    const indicatorEl = document.createElement('div');
    indicatorEl.className = 'slack-message bot-message bot-typing';
    indicatorEl.id = 'botTypingMsg';
    indicatorEl.innerHTML = `
      <div class="avatar bot-avatar">🤖</div>
      <div class="message-content">
        <div class="message-sender">
          <span class="name">CareerPilot AI</span>
          <span class="badge">APP</span>
        </div>
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    slackChatBody.appendChild(indicatorEl);
    slackChatBody.scrollTop = slackChatBody.scrollHeight;
    return indicatorEl;
  }

  function appendBotResponse(htmlContent) {
    const typing = document.getElementById('botTypingMsg');
    if (typing) typing.remove();

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgEl = document.createElement('div');
    msgEl.className = 'slack-message bot-message';
    msgEl.innerHTML = `
      <div class="avatar bot-avatar">🤖</div>
      <div class="message-content">
        <div class="message-sender">
          <span class="name">CareerPilot AI</span>
          <span class="badge">APP</span>
          <span class="timestamp">${time}</span>
        </div>
        <div class="message-text">
          ${htmlContent}
        </div>
      </div>
    `;
    slackChatBody.appendChild(msgEl);
    slackChatBody.scrollTop = slackChatBody.scrollHeight;
  }

  function processQuery(query) {
    appendUserMessage(query);
    appendBotTypingIndicator();

    const lower = query.toLowerCase();
    setTimeout(() => {
      if (lower.includes('roadmap') || lower.includes('path') || lower.includes('guide') || lower.includes('learning')) {
        appendBotResponse(knowledgeBase.roadmap.text);
      } else if (lower.includes('interview') || lower.includes('question') || lower.includes('dsa') || lower.includes('prep')) {
        appendBotResponse(knowledgeBase.interview.text);
      } else if (lower.includes('project') || lower.includes('idea') || lower.includes('build')) {
        appendBotResponse(knowledgeBase.project.text);
      } else if (lower.includes('resume') || lower.includes('cv') || lower.includes('portfolio')) {
        appendBotResponse(knowledgeBase.resume.text);
      } else if (lower.includes('anupriya') || lower.includes('who are you') || lower.includes('creator') || lower.includes('hire')) {
        appendBotResponse(`
          <p>🌟 <strong>About My Creator:</strong></p>
          <p>I was built by <strong>Anupriya S</strong>, a B.E. Computer Science & Engineering student at SNS College Of Technology (CGPA: <strong>9.33 / 10</strong>).</p>
          <p>She specializes in Python, NLP, Ollama, Llama 3.2, Flask, and Full Stack Web development. She presented scientific research on Brain-Computer Interfaces at CIT and is ready for impactful internship roles!</p>
          <p>📫 Reach out directly at <strong>anupriya07042006@gmail.com</strong> or call <strong>+91-6382750472</strong>.</p>
        `);
      } else {
        appendBotResponse(`
          <p>✨ <strong>CareerPilot AI Insight:</strong></p>
          <p>Analyzing query: <em>"${escapeHtml(query)}"</em> with Llama 3.2...</p>
          <ul>
            <li><strong>Core Recommendation:</strong> Strengthen your foundational proficiency in <strong>Data Structures, Algorithms (Java/Python)</strong>, and build deployable full-stack microservices with <strong>Flask</strong>.</li>
            <li><strong>AI Integration:</strong> Learn how to orchestrate local LLMs (Ollama) with prompt chaining, vector embeddings, and real-time APIs.</li>
            <li><strong>Action Step:</strong> Check the quick prompt buttons above to explore structured roadmaps, interview question sets, or project blueprints!</li>
          </ul>
        `);
      }
    }, 850);
  }

  promptPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const promptKey = pill.getAttribute('data-prompt');
      if (knowledgeBase[promptKey]) {
        processQuery(knowledgeBase[promptKey].title);
      }
    });
  });

  if (slackChatForm) {
    slackChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = slackUserInput.value.trim();
      if (!val) return;
      processQuery(val);
      slackUserInput.value = '';
    });
  }

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      slackChatBody.innerHTML = `
        <div class="slack-message bot-message">
          <div class="avatar bot-avatar">🤖</div>
          <div class="message-content">
            <div class="message-sender">
              <span class="name">CareerPilot AI</span>
              <span class="badge">APP</span>
              <span class="timestamp">Just now</span>
            </div>
            <div class="message-text">
              <p>Chat cleared! Select a prompt above or ask any career, technical, or interview question.</p>
            </div>
          </div>
        </div>
      `;
      showToast('Chat history reset');
    });
  }

  /* --------------------------------------------------------------------------
     5. AI PATENT EXPLORER SANDBOX ENGINE
     -------------------------------------------------------------------------- */
  const patentDatabase = [
    {
      id: "US-11928374-B2",
      title: "Real-Time Neural Signal Stream Decoding for Assistive Interfaces",
      domain: "Brain-Computer Interface",
      abstract: "A low-latency stream computing system configured to classify EEG signals using temporal convolutional networks for paralyzed patient intent prediction.",
      similarity: "98.4%",
      tags: ["BCI", "Stream Computing", "Neural AI"]
    },
    {
      id: "EP-3849201-A1",
      title: "Semantic Patent Document Clustering Using Dense Transformer Embeddings",
      domain: "Natural Language Processing",
      abstract: "Methods and apparatus for parsing multidimensional patent claims, extracting semantic vectors, and computing technological whitespace trajectories.",
      similarity: "95.1%",
      tags: ["NLP", "Transformers", "Clustering"]
    },
    {
      id: "US-10847291-B1",
      title: "Autonomous Path Trajectory Planning with Vision-Based Deep Reinforcement Learning",
      domain: "Autonomous Vehicles",
      abstract: "Hierarchical reinforcement learning pipeline for real-time obstacle avoidance and dynamic trajectory forecasting in unmapped environments.",
      similarity: "92.7%",
      tags: ["Robotics", "Computer Vision", "RL"]
    },
    {
      id: "WO-2024-089123-A2",
      title: "Multimodal Deep Learning Architecture for Early Clinical Biomarker Classification",
      domain: "Healthcare Diagnostics",
      abstract: "An ensemble deep learning framework synthesizing patient medical history, telemetry logs, and high-resolution imaging for automated triage.",
      similarity: "91.3%",
      tags: ["MedTech", "Biomarkers", "Ensemble AI"]
    },
    {
      id: "US-12049182-B2",
      title: "Distributed Edge Inference for Low-Power Quantized Large Language Models",
      domain: "Natural Language Processing",
      abstract: "Hardware-aware model quantization and memory streaming techniques allowing local LLMs (e.g. Llama models) to run at high throughput on edge hardware.",
      similarity: "96.8%",
      tags: ["Edge AI", "Llama 3.2", "Quantization"]
    },
    {
      id: "US-11750293-A1",
      title: "Brain-Machine Hybrid Telemetry for Closed-Loop Motor Neuroprosthetics",
      domain: "Brain-Computer Interface",
      abstract: "Closed-loop neuromodulation apparatus using stream computing pipelines to synchronize sensory feedback stimulation with decoded neural intent.",
      similarity: "94.2%",
      tags: ["Neuroprosthetics", "Real-Time AI", "Feedback"]
    }
  ];

  const patentSearchInput = document.getElementById('patentSearchInput');
  const patentSearchBtn = document.getElementById('patentSearchBtn');
  const patentCardsGrid = document.getElementById('patentCardsGrid');
  const patentCountEl = document.getElementById('patentCount');
  const patentSimilarityEl = document.getElementById('patentSimilarity');
  const patentDomainEl = document.getElementById('patentDomain');
  const sampleSearchChips = document.querySelectorAll('.sample-chip');

  function renderPatents(query) {
    if (!patentCardsGrid) return;
    const q = query.toLowerCase().trim();

    const matches = patentDatabase.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    });

    const displayList = matches.length > 0 ? matches : patentDatabase;

    patentCardsGrid.innerHTML = '';
    displayList.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'patent-item-card';
      card.innerHTML = `
        <div class="patent-id">${item.id} • ${item.domain}</div>
        <h4>${item.title}</h4>
        <p>${item.abstract}</p>
        <div class="patent-metrics">
          <span class="similarity-badge">Match: ${item.similarity}</span>
          <div class="patent-item-tags">
            ${item.tags.map(t => `<span class="patent-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
      patentCardsGrid.appendChild(card);
    });

    if (patentCountEl) {
      patentCountEl.textContent = (displayList.length * 482 + 120).toLocaleString();
    }
    if (patentSimilarityEl && displayList.length > 0) {
      patentSimilarityEl.textContent = displayList[0].similarity;
    }
    if (patentDomainEl && displayList.length > 0) {
      patentDomainEl.textContent = displayList[0].domain;
    }
  }

  // Initial render
  renderPatents('Brain-Computer Interface');

  if (patentSearchBtn && patentSearchInput) {
    patentSearchBtn.addEventListener('click', () => {
      renderPatents(patentSearchInput.value);
      showToast(`Analyzing patent landscape for "${patentSearchInput.value}"`);
    });

    patentSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        renderPatents(patentSearchInput.value);
        showToast(`Analyzing patent landscape for "${patentSearchInput.value}"`);
      }
    });
  }

  sampleSearchChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      if (patentSearchInput) patentSearchInput.value = q;
      renderPatents(q);
      showToast(`Filter applied: ${q}`);
    });
  });

  /* --------------------------------------------------------------------------
     6. INTERACTIVE DEVELOPER CLI TERMINAL
     -------------------------------------------------------------------------- */
  const terminalModal = document.getElementById('terminalModal');
  const openTerminalBtn = document.getElementById('openTerminalBtn');
  const closeTerminalBtn = document.getElementById('closeTerminalBtn');
  const closeTerminalDot = document.getElementById('closeTerminalDot');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  function openTerminal() {
    if (terminalModal) {
      terminalModal.classList.add('open');
      if (terminalInput) terminalInput.focus();
    }
  }

  function closeTerminal() {
    if (terminalModal) terminalModal.classList.remove('open');
  }

  if (openTerminalBtn) openTerminalBtn.addEventListener('click', openTerminal);
  if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeTerminal);
  if (closeTerminalDot) closeTerminalDot.addEventListener('click', closeTerminal);

  // Keyboard shortcut Ctrl + ` or Escape
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === '`') || (e.key === '`' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
      e.preventDefault();
      if (terminalModal && terminalModal.classList.contains('open')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    }
    if (e.key === 'Escape') {
      closeTerminal();
      closeResumeModal();
    }
  });

  const termCommands = {
    help: () => `
      <div class="term-line">Available commands:</div>
      <div class="term-line">  <span class="term-cmd">about</span>      - Learn about Anupriya S</div>
      <div class="term-line">  <span class="term-cmd">education</span>  - Academic background & CGPA</div>
      <div class="term-line">  <span class="term-cmd">skills</span>     - Technical competencies & AI tools</div>
      <div class="term-line">  <span class="term-cmd">projects</span>   - Flagship projects overview</div>
      <div class="term-line">  <span class="term-cmd">experience</span> - Internship & Research history</div>
      <div class="term-line">  <span class="term-cmd">contact</span>    - Direct email, phone & social links</div>
      <div class="term-line">  <span class="term-cmd">hire</span>       - Why hire Anupriya S?</div>
      <div class="term-line">  <span class="term-cmd">clear</span>      - Clear terminal screen</div>
    `,
    about: () => `
      <div class="term-line"><strong>Anupriya S</strong> — AI & Full Stack Developer</div>
      <div class="term-line">Passionate engineering student crafting scalable intelligent software, NLP systems, and AI assistants.</div>
      <div class="term-line">Based in Coimbatore, India. Active builder of CareerPilot AI & AI Patent Explorer.</div>
    `,
    education: () => `
      <div class="term-line">🎓 <strong>SNS College Of Technology</strong> (2025 – 2029)</div>
      <div class="term-line">Degree: Bachelor of Engineering in Computer Science & Engineering</div>
      <div class="term-line">Academic CGPA: <span class="term-highlight">9.33 / 10</span> (Coimbatore, India)</div>
    `,
    skills: () => `
      <div class="term-line">⚡ <strong>Core Competencies:</strong> Data Structures & Algorithms, OOP, Problem Solving</div>
      <div class="term-line">💻 <strong>Languages:</strong> Java, Python, HTML5, CSS3, JavaScript</div>
      <div class="term-line">🛠️ <strong>Frameworks:</strong> Flask, Slack API & Bolt, Bootstrap, REST APIs</div>
      <div class="term-line">🤖 <strong>AI & Platforms:</strong> Ollama, Llama 3.2, OpenAI API, Gemini, Claude, Copilot, Figma</div>
      <div class="term-line">📦 <strong>Tools:</strong> Git, GitHub, VS Code</div>
    `,
    projects: () => `
      <div class="term-line">🚀 <strong>1. AI Patent Explorer:</strong> Python, NLP, Machine Learning, Flask, Patent APIs, Pandas</div>
      <div class="term-line">   Semantic search, trend analytics, similar patent clustering.</div>
      <div class="term-line">🤖 <strong>2. CareerPilot AI:</strong> Python, Slack Bolt, Slack API, Ollama, Llama 3.2</div>
      <div class="term-line">   Slack career guidance bot with Socket Mode & localized LLM inference.</div>
    `,
    experience: () => `
      <div class="term-line">💼 <strong>Internship:</strong> Full Stack Web Development Intern @ Nxtlogic Software Solutions (June 2026)</div>
      <div class="term-line">🔬 <strong>Paper Presentation:</strong> AI-Powered Real-Time Brain-Computer Interface for Paralyzed Patients Using Stream Computing @ CIT</div>
    `,
    contact: () => `
      <div class="term-line">📧 Email: <a href="mailto:anupriya07042006@gmail.com" style="color:#38bdf8">anupriya07042006@gmail.com</a></div>
      <div class="term-line">📞 Phone: <a href="tel:+916382750472" style="color:#38bdf8">+91-6382750472</a></div>
      <div class="term-line">🌐 LinkedIn & GitHub available in portfolio footer.</div>
    `,
    hire: () => `
      <div class="term-line">🎯 <span class="term-highlight">Why Hire Anupriya S?</span></div>
      <div class="term-line">  ✓ Top-tier academic record: 9.33 / 10 CGPA</div>
      <div class="term-line">  ✓ Practical engineering: Proven hands-on experience with Ollama, Llama 3.2, Flask, and Slack APIs</div>
      <div class="term-line">  ✓ Scientific rigor: Published/presented BCI neural AI research at CIT</div>
      <div class="term-line">  ✓ Fast, curious, and collaborative full-stack builder</div>
    `
  };

  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        const line = document.createElement('div');
        line.className = 'term-line';
        line.innerHTML = `<span class="term-prompt">anupriya:~$</span> ${escapeHtml(cmd)}`;
        terminalOutput.appendChild(line);

        if (cmd === 'clear') {
          terminalOutput.innerHTML = '';
        } else if (termCommands[cmd]) {
          const resp = document.createElement('div');
          resp.innerHTML = termCommands[cmd]();
          terminalOutput.appendChild(resp);
        } else if (cmd === '') {
          // Do nothing
        } else {
          const err = document.createElement('div');
          err.className = 'term-line';
          err.innerHTML = `<span style="color:#f87171">Command not found: "${escapeHtml(cmd)}". Type <span class="term-cmd">help</span> for available commands.</span>`;
          terminalOutput.appendChild(err);
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. SKILLS FILTER TABS
     -------------------------------------------------------------------------- */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cats = card.getAttribute('data-category') || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     8. 1-CLICK COPY TO CLIPBOARD
     -------------------------------------------------------------------------- */
  const copyElements = document.querySelectorAll('[data-copy]');

  copyElements.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = el.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast(`Selected: ${textToCopy}`);
      });
    });
  });

  /* --------------------------------------------------------------------------
     9. TOAST NOTIFICATION HELPER
     -------------------------------------------------------------------------- */
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  /* --------------------------------------------------------------------------
     10. CONTACT FORM HANDLER
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('portfolioContactForm');
  const formStatusMsg = document.getElementById('formStatusMsg');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const subject = document.getElementById('messageSubject').value;
      const message = document.getElementById('messageBody').value;

      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `<span>Sending...</span>`;
      }

      setTimeout(() => {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg success';
          formStatusMsg.textContent = `Thank you, ${name}! Your message has been prepared. You can also directly reach Anupriya at anupriya07042006@gmail.com.`;
        }
        showToast('Message submitted successfully!');
        contactForm.reset();

        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            Send Message
          `;
        }
      }, 1000);
    });
  }

  /* --------------------------------------------------------------------------
     11. RESUME MODAL
     -------------------------------------------------------------------------- */
  const resumeModal = document.getElementById('resumeModal');
  const openResumeModalBtn = document.getElementById('openResumeModalBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');

  function openResumeModal() {
    if (resumeModal) resumeModal.classList.add('open');
  }
  function closeResumeModal() {
    if (resumeModal) resumeModal.classList.remove('open');
  }

  if (openResumeModalBtn) openResumeModalBtn.addEventListener('click', openResumeModal);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);

  /* --------------------------------------------------------------------------
     12. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  /* --------------------------------------------------------------------------
     13. 3D CARD TILT EFFECT ON HOVER
     -------------------------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });

  /* --------------------------------------------------------------------------
     14. UTILITY HELPER
     -------------------------------------------------------------------------- */
  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

});
