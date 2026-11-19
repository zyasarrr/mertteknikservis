/* MERT TEKNİK — Interactions and campaign manager */
"use strict";

// YouTube embed URL veya doğrudan MP4 bağlantısını buraya ekleyin.
// Örnek YouTube: https://www.youtube.com/embed/VIDEO_ID
// Örnek MP4: https://siteadresiniz.com/video/servis.mp4
const MEDIA_VIDEO_URL = "";

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Bootstrap toast bildirimleri
  const toastElement = document.getElementById("siteToast");
  const toastMessage = document.getElementById("toastMessage");
  const siteToast = toastElement && window.bootstrap
    ? bootstrap.Toast.getOrCreateInstance(toastElement, { delay: 3200 })
    : null;

  function notify(message) {
    if (!siteToast) return;
    toastMessage.textContent = message;
    siteToast.show();
  }

  // Mobil menüde bağlantıya tıklanınca menüyü kapat
  document.querySelectorAll("#mainNav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("mainNav");
      if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });

  // Yukarı çık butonu
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Kaydırma animasyonları
  const revealTargets = document.querySelectorAll(
    ".section-heading, .service-card, .brand-tile, .campaign-card, .gallery-feature, .gallery-small, .contact-panel"
  );
  revealTargets.forEach(el => el.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("in-view"));
  }

  // Kampanyaları localStorage üzerinden yönet
  const CAMPAIGN_STORAGE_KEY = "mertTeknikCampaigns";
  const campaignList = document.getElementById("campaignList");
  const campaignForm = document.getElementById("campaignForm");
  const campaignModalElement = document.getElementById("campaignModal");

  function readCampaigns() {
    try {
      return JSON.parse(localStorage.getItem(CAMPAIGN_STORAGE_KEY) || "[]");
    } catch (error) {
      console.warn("Kampanya verileri okunamadı:", error);
      return [];
    }
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[char]);
  }

  function campaignTemplate(campaign) {
    const dark = campaign.color === "dark";
    return `
      <div class="col-md-6 col-lg-4" data-campaign-id="${escapeHTML(campaign.id)}">
        <article class="campaign-card">
          <div class="campaign-art ${dark ? "campaign-art-dark" : ""}">
            <span>${escapeHTML(campaign.tag || "MERT TEKNİK")}</span>
            <i class="bi bi-megaphone"></i>
            <b>${escapeHTML(campaign.title).replace(/\s+/g, "<br>")}</b>
          </div>
          <div class="campaign-body">
            <small>GÜNCEL KAMPANYA</small>
            <h3>${escapeHTML(campaign.title)}</h3>
            <p>${escapeHTML(campaign.description)}</p>
            <a href="tel:+905366367416">Bilgi alın <i class="bi bi-arrow-right"></i></a>
            <button type="button" class="btn btn-sm btn-outline-danger mt-3 delete-campaign" data-id="${escapeHTML(campaign.id)}">
              <i class="bi bi-trash3 me-1"></i> Kampanyayı kaldır
            </button>
          </div>
        </article>
      </div>`;
  }

  function renderCampaigns() {
    const campaigns = readCampaigns();
    campaignList.querySelectorAll("[data-campaign-id]").forEach(el => el.remove());
    campaigns.slice().reverse().forEach(campaign => {
      campaignList.insertAdjacentHTML("afterbegin", campaignTemplate(campaign));
    });
  }

  campaignForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!campaignForm.reportValidity()) return;

    const campaign = {
      id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
      title: document.getElementById("campaignTitle").value.trim(),
      description: document.getElementById("campaignDescription").value.trim(),
      tag: document.getElementById("campaignTag").value.trim() || "MERT TEKNİK",
      color: document.getElementById("campaignColor").value,
      createdAt: new Date().toISOString()
    };

    const campaigns = readCampaigns();
    campaigns.push(campaign);
    try {
      localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(campaigns));
      renderCampaigns();
      campaignForm.reset();
      bootstrap.Modal.getOrCreateInstance(campaignModalElement).hide();
      notify("Kampanya başarıyla eklendi.");
    } catch (error) {
      notify("Kampanya kaydedilemedi. Tarayıcı depolama alanını kontrol edin.");
      console.error(error);
    }
  });

  campaignList.addEventListener("click", event => {
    const deleteButton = event.target.closest(".delete-campaign");
    if (!deleteButton) return;
    const updated = readCampaigns().filter(item => item.id !== deleteButton.dataset.id);
    localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(updated));
    renderCampaigns();
    notify("Kampanya kaldırıldı.");
  });

  renderCampaigns();

  // Video modalı: YouTube embed veya MP4 destekler
  const mediaModal = document.getElementById("mediaModal");
  const mediaContainer = document.getElementById("mediaContainer");
  mediaModal.addEventListener("show.bs.modal", () => {
    if (!MEDIA_VIDEO_URL) return;
    const safeUrl = MEDIA_VIDEO_URL.trim();
    if (/youtube\.com\/embed\/|player\.vimeo\.com\/video\//i.test(safeUrl)) {
      mediaContainer.innerHTML = `<iframe src="${safeUrl}" title="Mert Teknik servis videosu" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (/\.mp4($|\?)/i.test(safeUrl)) {
      const video = document.createElement("video");
      video.src = safeUrl;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.className = "w-100 h-100";
      mediaContainer.replaceChildren(video);
    }
  });
  mediaModal.addEventListener("hidden.bs.modal", () => {
    mediaContainer.innerHTML = `<div class="media-empty"><i class="bi bi-camera-video"></i><p>Video bağlantısı henüz eklenmedi.</p><small>script.js dosyasındaki MEDIA_VIDEO_URL alanına YouTube embed veya MP4 adresi ekleyin.</small></div>`;
  });

  // Sayfa içi anchor bağlantılarında yumuşak kaydırma
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
