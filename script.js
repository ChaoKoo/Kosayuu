gsap.registerPlugin(ScrollTrigger);

// --- 1. 自定义光标实现 (与 CSS 配合，实现 Mix-Blend-Mode 效果) ---
const cursor = document.getElementById('custom-cursor');
const clickableTargets = document.querySelectorAll('a, button, [data-hover-target], .project-card');

// 监听鼠标移动，实时更新光标位置
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1, 
        ease: 'power2.out'
    });
});

// 监听可点击元素，实现光标状态变化
clickableTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});


// --- 2. 首页 GSAP 动画：逐行文字入场 ---
function initHeroAnimation() {
    const roleText = document.querySelector('.role-text');
    const headlineLines = gsap.utils.toArray('.headline span'); // 选取标题的每一行
    const ctaWrapper = document.querySelector('.cta-wrapper');

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. 角色文本入场
    tl.from(roleText, { 
        y: 20, 
        opacity: 0, 
        duration: 0.8 
    })
    // 2. 标题逐行入场 (更高级的设计效果)
    .from(headlineLines, {
        y: '100%', // 从自身高度下方移入
        opacity: 0,
        stagger: 0.2, // 每行文字延迟 0.2 秒入场
        duration: 1.2,
    }, "-=0.4")
    // 3. CTA 按钮入场
    .from(ctaWrapper, { 
        y: 20,
        opacity: 0, 
        duration: 0.6, 
    }, "-=0.8");
}


// --- 3. 滚动触发的 GSAP 动画：元素渐现 ---
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll-fade]');

    scrollElements.forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 30, // 稍微从下方滑入
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%", // 当元素顶部进入视口 90% 时触发
                toggleActions: "play none none none",
            }
        });
    });
}


// --- 初始化所有动画 ---
window.addEventListener('load', () => {
    initHeroAnimation();
    initScrollAnimations();
});
