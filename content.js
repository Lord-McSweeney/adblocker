// TODO: Does not work on nbc articles yet since it removes a critical element
var removeclasses = ["js-sidebar-zone", "js-zone-container", "adsbygoogle", "adtester-container-100", "adtester-container", "ad-container", "zmgad-right-rail", "zmgad-full-width", "top-ads-container", "aff-unit__wrapper", "v_300_large", "v_970_billboard", "v_728_leaderboard", "ad-container", "topbannerAd", "ad", "ad-stickyhero--standard", "sidebar-ads-holder-top", "content-ads-holder", ["space.com", "dfp-leaderboard-container"], "ad-unit", "adunit", ["space.com", "bordeaux-generated-spacer"], ["space.com", "bordeaux-filled-slot"], "trc_spotlight_widget", "ad-placement", ["vice.com", "docked-slot-renderer", true], ["vice.com", "sticky-wrapper", true], ["vice.com", "bx-slab", true], ["vice.com", "adph"], "ADSlot", ["autooverload.com", "stickyfooter"], "udm-ad", ["archaeology.org", "top_black"], ["oceandraw.com", "bottom-of-post"], /*depends on if you want to see reddit promoted links*/ ["reddit.com", "promotedlink"], ["xeiaso.net", "adaptive"]];
var removeids = ["3pCheckIframeId", "div-gpt-ad-codebeautify_org-box-4-0", "div-gpt-ad-codebeautify_org-box-2-0", "div-gpt-ad-codebeautify_org-medrectangle-2-0", "p-Ads", "incontent_player", "carbonads", "AdThrive_Recipe_1_desktop", "taboola-mobile-below-article-thumbnails", "top_ad"];
// taboola-right-rail-thumbnails-rcna51127
// taboola-below-article-feed
function crawl(element) {
    for (var i in element.children) {
        if (element.children.includes("taboola")) {
            console.log("GOTIT", element, element.id);
            return;
        }
        crawl(element.children[i]);
    }
}
var adblockta = function() {
    try {
        for (var i = 0; i < document.getElementsByTagName("iframe").length; i++) {
            if (document.getElementsByTagName("iframe")[i].src.includes("googlead") || document.getElementsByTagName("iframe")[i].src.includes("safeframe.googlesyndication") || document.getElementsByTagName("iframe")[i].src.includes("adservice")) {
                document.getElementsByTagName("iframe")[i].remove()
            }
        }
        for (var i in document.getElementsByTagName("div")) {
            if (document.getElementsByTagName("div")[i].id && (document.getElementsByTagName("div")[i].id.includes("google_ads_iframe") || document.getElementsByTagName("div")[i].id.includes("superbannerWrapper"))) {
                document.getElementsByTagName("div")[i].remove();
                continue;
            }
            if (document.getElementsByTagName("div")[i].outerHTML && document.getElementsByTagName("div")[i].outerHTML.startsWith("<div data-before-content=\"advertisement\"") && window.location.host.includes("reddit.com")) {
                document.getElementsByTagName("div")[i].parentElement.remove();
            }
            if (document.getElementsByTagName("div")[i].innerText && (document.getElementsByTagName("div")[i].innerText.toUpperCase() === "ADVERTISEMENT" || document.getElementsByTagName("div")[i].innerText.toUpperCase() === "ADVERTISEMENTS")) {
                document.getElementsByTagName("div")[i].remove();
            }
            if (document.getElementsByTagName("div")[i] && document.getElementsByTagName("div")[i].id && document.getElementsByTagName("div")[i].id.includes("adRootContainer")) {
                document.getElementsByTagName("div")[i].remove();
            }
        }
        for (var i in document.getElementsByClassName("pgCloseBtn")) {
            if (document.getElementsByClassName("pgCloseBtn") && document.getElementsByClassName("pgCloseBtn")[i] && typeof document.getElementsByClassName("pgCloseBtn")[i].click === "function") {
                document.getElementsByClassName("pgCloseBtn")[i].click();
            }
        }
        for (var i in document.getElementsByClassName("closeBtnCircular")) {
            if (document.getElementsByClassName("closeBtnCircular") && document.getElementsByClassName("closeBtnCircular")[i] && typeof document.getElementsByClassName("closeBtnCircular")[i].click === "function") {
                document.getElementsByClassName("closeBtnCircular")[i].click();
            }
        }
        if (document.getElementById("close-btn") && document.getElementById("close-btn")[i] && typeof document.getElementById("close-btn")[i].click === "function") {
            document.getElementById("close-btn")[i].click();
        }
        
        if (window.location.host.includes("hackaday.com") && !("leaderboard" in removeids)) {
            removeids.push("leaderboard");
            document.getElementById("secondary").style.marginTop = "0px";
        }
        if (window.location.host.includes("space.com")) {
            document.body.style.backgroundImage = "";
        }
        if (window.location.host.includes("vice.com")) {
            if (document.querySelector(".main-content").children[0].style.height === "273px") {
                document.querySelector(".main-content").children[0].remove();
            }
        }
        if (window.location.host.includes("nbcnews.com")) {
            for (var i in document.getElementsByClassName("ad-container")) {
                if (document.getElementsByClassName("ad-container")[i] instanceof HTMLElement) {
                   document.getElementsByClassName("ad-container")[i].style.display = "none";
                }
            }
            /*if (document.getElementsByClassName("ad-container") && document.getElementsByClassName("ad-container")[0] && typeof document.getElementsByClassName("ad-container")[0].remove === "function") {
                document.getElementsByClassName("ad-container")[0].remove();
            } // Why, NBC?*/
        } else {
            for (var q in removeclasses) {
                var clas = removeclasses[q];
                if (Array.isArray(clas)) {
                    var clas2 = clas[0];
                    var clas3 = clas[2];
                    clas = clas[1];
                    if (window.location.host.includes(clas2)) {
                        for (var i in document.getElementsByClassName(clas)) {
                            if (document.getElementsByClassName(clas) && document.getElementsByClassName(clas)[i] && typeof document.getElementsByClassName(clas)[i].remove === "function") {
                                if (clas3) {
                                    console.log("style.display is now none", clas, i);
                                    document.getElementsByClassName(clas)[i].style.display = "none";
                                } else {
                                    document.getElementsByClassName(clas)[i].remove();
                                }
                            }
                        }
                    }
                } else {
                    for (var i in document.getElementsByClassName(clas)) {
                        if (document.getElementsByClassName(clas) && document.getElementsByClassName(clas)[i] && typeof document.getElementsByClassName(clas)[i].remove === "function") {
                            document.getElementsByClassName(clas)[i].remove();
                        }
                    }
                }
            }
        }
        for (var j in removeids) {
            if (document.getElementById(removeids[j]) && typeof document.getElementById(removeids[j]).remove === "function") {
                document.getElementById(removeids[j]).remove();
                console.log("Removed element with id3", removeids[j].id);
            }
        }
        
    } catch(e) {console.log("Adblock error:", e)}
};
window.setInterval(adblockta, 125);
if (window.location.host === "theannoyingsite.com" && window.location.pathname === "/") {
    document.write("Might not want to go to this site. :\\")
}
