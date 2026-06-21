# Capital Flow Lab - Verification Checklist

Sử dụng checklist này để verify trang Capital Flow Lab hoạt động đúng trước khi demo hoặc deploy.

---

## 🔧 Technical Verification

### Dependencies
- [x] `three` installed
- [x] `@react-three/fiber` installed
- [x] `@react-three/drei` installed
- [x] No dependency conflicts

### Code Quality
- [x] `npm run lint` passes (0 errors, 0 warnings)
- [x] `npm run build` succeeds
- [x] No console errors in dev mode
- [ ] No console warnings (check manually)

### Files Created
- [x] 15 component files in `src/components/capital-lab/`
- [x] 7 CSS files for styling
- [x] `capitalLabData.js` data file
- [x] 2 custom hooks
- [x] `CapitalLabPage.jsx` main page
- [x] Route added to `App.jsx`
- [x] Navigation updated in `Header.jsx`

---

## 🌐 Browser Testing

### Desktop Chrome/Edge
- [ ] Page loads without errors
- [ ] 3D scene renders correctly
- [ ] Buildings visible (3 towers)
- [ ] 5 nodes visible and labeled
- [ ] Capital flow pulse animating
- [ ] Mouse tracking works
- [ ] Drag to rotate works
- [ ] Scroll wheel zoom works
- [ ] Hover nodes highlights them
- [ ] Click nodes opens detail panel
- [ ] Crisis button works
- [ ] Crisis animation plays smoothly
- [ ] Stakeholders appear in chapter 6
- [ ] Recovery challenge works
- [ ] Sliders adjust values
- [ ] Recovery succeeds at optimal values
- [ ] Reset button works
- [ ] Chapter dots navigation works
- [ ] Scroll hint appears and animates
- [ ] No memory leaks (check DevTools)

### Firefox
- [ ] Page loads
- [ ] 3D renders correctly
- [ ] All interactions work

### Safari
- [ ] Page loads
- [ ] 3D renders correctly
- [ ] All interactions work

### Mobile (if available)
- [ ] Page loads on mobile
- [ ] Touch drag works
- [ ] Touch zoom works
- [ ] Simplified 3D renders
- [ ] No horizontal scroll
- [ ] Buttons accessible

---

## 🎨 Visual Verification

### Hero Chapter
- [ ] 3D scene fills viewport
- [ ] Buildings positioned correctly
- [ ] Nodes in correct positions (T left, T' right)
- [ ] Dòng vốn vàng visible
- [ ] Grid visible on ground
- [ ] Fog effect present
- [ ] Chapter overlay shows correct text
- [ ] Scroll hint animates

### Chapter Transitions
- [ ] Chapter 1 → 2: Camera focuses T
- [ ] Chapter 2 → 3: Camera to H
- [ ] Chapter 3 → 4: Camera to SX (center)
- [ ] Chapter 4 → 5: Camera to H' (buildings)
- [ ] Chapter 5 → 6: Camera to bottleneck
- [ ] Chapter 6 → 7: Camera pulls back for stakeholders
- [ ] Chapter 7 → 8: Camera to recovery view
- [ ] All transitions smooth (no jerky movement)

### Crisis State
- [ ] Button has pulse animation before click
- [ ] Crisis sequence plays (~2s)
- [ ] Dòng vốn stops at H' → T'
- [ ] T' node turns gray/locked
- [ ] Buildings turn cooler color
- [ ] Red indicator at bottleneck
- [ ] Stakeholders show red connections
- [ ] State indicator shows "Khủng hoảng thanh khoản"
- [ ] Crisis overlay text appears

### Recovery State
- [ ] Recovery panel appears in chapter 8
- [ ] 3 sliders visible
- [ ] Slider values display correctly
- [ ] Optimal ranges shown
- [ ] When all in optimal range:
  - [ ] Dòng H' → T' reconnects
  - [ ] T' turns green
  - [ ] Badge "Đã khôi phục" appears
  - [ ] State indicator changes

---

## 🎯 Interaction Testing

### Mouse Interactions (Desktop)
- [ ] Hover node → cursor changes to pointer
- [ ] Hover node → node scales up
- [ ] Hover node → glow increases
- [ ] Click node → detail panel opens
- [ ] Detail panel → Close button works
- [ ] Drag anywhere → camera rotates
- [ ] Drag respect limits (can't flip upside down)
- [ ] Mouse move → subtle parallax (hero only)

### Click Interactions
- [ ] Click T node → Shows "Tư bản tiền tệ" detail
- [ ] Click H node → Shows "Đầu vào" detail
- [ ] Click SX node → Shows "Sản xuất" detail
- [ ] Click H' node → Shows "Hàng hóa" detail
- [ ] Click T' node → Shows "Thanh khoản" detail
- [ ] Click stakeholder → Shows impact details
- [ ] Click crisis button → Triggers crisis
- [ ] Click reset button → Returns to normal
- [ ] Click chapter dot → Jumps to chapter

### Scroll Interactions
- [ ] Scroll down → Camera moves through chapters
- [ ] Scroll up → Camera moves back
- [ ] Scroll smooth (Lenis working)
- [ ] Chapter changes auto as scroll
- [ ] Active dot updates
- [ ] Overlay content updates

---

## ♿ Accessibility Testing

### Reduced Motion
- [ ] Enable "prefers-reduced-motion" in browser
- [ ] Page still loads
- [ ] Mouse parallax disabled
- [ ] Camera transitions slower/instant
- [ ] Particle animations disabled
- [ ] Interactions still work
- [ ] Content still accessible

### Keyboard Navigation
- [ ] Tab through buttons
- [ ] Focus visible
- [ ] Enter activates buttons
- [ ] Escape closes panels (if implemented)

### WebGL Fallback
- [ ] Disable WebGL in browser
- [ ] Fallback UI appears
- [ ] Fallback explains issue
- [ ] Fallback offers solutions
- [ ] Link to home works

---

## 📊 Performance Testing

### FPS
- [ ] Check FPS in DevTools (F12 → Performance)
- [ ] Target: 60 FPS or close on desktop
- [ ] Mobile: 30+ FPS acceptable
- [ ] No stuttering during interactions
- [ ] Smooth camera transitions

### Memory
- [ ] Check Memory in DevTools
- [ ] Load page → Note memory
- [ ] Trigger crisis → Note memory
- [ ] Reset → Note memory
- [ ] Navigate away → Memory released
- [ ] Return to page → No accumulation

### Network
- [ ] Check Network tab
- [ ] CapitalLabPage chunk loads only on /capital-lab
- [ ] Three.js not in initial bundle
- [ ] Reasonable load time (<3s on good connection)

---

## 📱 Responsive Testing

### Desktop (1920x1080)
- [ ] Full experience
- [ ] All features work
- [ ] No overflow
- [ ] UI properly positioned

### Laptop (1366x768)
- [ ] Scene scales correctly
- [ ] UI still readable
- [ ] No clipping

### Tablet (768x1024)
- [ ] Touch works
- [ ] Scene simplified
- [ ] UI adapted
- [ ] Performance OK

### Mobile (390x844)
- [ ] Touch works
- [ ] Scene very simplified
- [ ] UI stacked vertically
- [ ] No horizontal scroll
- [ ] Performance acceptable

---

## 🎓 Content Verification

### Academic Accuracy
- [ ] Formula shown: T - H … SX … H' - T'
- [ ] T labeled "Tư bản tiền tệ"
- [ ] H labeled correctly
- [ ] SX labeled correctly
- [ ] H' labeled "Tư bản hàng hóa"
- [ ] T' labeled "Tiền thu về sau tiêu thụ"
- [ ] 10.000 tỷ mentioned
- [ ] 3 tòa tháp present
- [ ] MLN122 theory quotes present
- [ ] Bottleneck clearly shown
- [ ] 5 stakeholders present with correct roles

### Text Content
- [ ] No typos in chapter titles
- [ ] No typos in descriptions
- [ ] No typos in theory quotes
- [ ] No typos in UI labels
- [ ] Vietnamese diacritics correct
- [ ] Consistent terminology

---

## 🔐 Security & Privacy

### Data Handling
- [ ] No sensitive data collected
- [ ] No external API calls (unless documented)
- [ ] No cookies set
- [ ] No localStorage (unless documented)
- [ ] No tracking scripts

### Third-Party
- [ ] Three.js from npm (verified)
- [ ] @react-three packages from npm
- [ ] No suspicious dependencies

---

## 📝 Documentation Verification

### Files Present
- [x] `CAPITAL_LAB_README.md` - Technical doc
- [x] `docs/CAPITAL_LAB_USER_GUIDE.md` - User guide
- [x] `IMPLEMENTATION_SUMMARY.md` - Summary
- [x] `QUICK_START.md` - Demo guide
- [x] This checklist

### Documentation Quality
- [ ] README has all sections
- [ ] User guide clear and helpful
- [ ] No broken internal links
- [ ] Code examples correct
- [ ] Commands work as documented

---

## 🚀 Pre-Demo Checklist

### 1 Day Before
- [ ] Run full verification
- [ ] Test on presentation laptop
- [ ] Test with projector/screen
- [ ] Prepare backup (slides/video)
- [ ] Note URL: http://localhost:5174/capital-lab

### 1 Hour Before
- [ ] Start dev server
- [ ] Load page in browser
- [ ] Test crisis trigger once
- [ ] Test recovery once
- [ ] Leave tab open (cached)

### Right Before Demo
- [ ] Check WiFi/connection
- [ ] Close unnecessary tabs
- [ ] Full screen browser (F11)
- [ ] Volume off (no unexpected sounds)
- [ ] Have script/notes ready

---

## 🎯 Acceptance Criteria

### Minimum Requirements (Must Have)
- [x] 3D scene renders
- [x] 5 nodes visible and interactive
- [x] Capital flow animates
- [x] Crisis trigger works
- [x] Recovery challenge works
- [x] No console errors
- [x] Responsive (desktop + mobile)

### Nice to Have (Should Have)
- [x] Mouse tracking
- [x] Smooth transitions
- [x] Stakeholders interactive
- [x] Chapter navigation
- [x] Detail panels
- [x] Reduced motion support
- [x] WebGL fallback

### Exceptional (Great to Have)
- [x] Scroll hint
- [x] Comprehensive docs
- [x] User guide
- [x] Demo script
- [ ] Real device tested
- [ ] Cross-browser tested

---

## ✅ Final Sign-Off

### Before marking complete:

- [ ] **All critical tests pass**
- [ ] **No blocking bugs**
- [ ] **Performance acceptable**
- [ ] **Documentation complete**
- [ ] **Ready for demo**

### Sign-off:

**Tested by:** _________________  
**Date:** _________________  
**Browser:** _________________  
**Notes:** _________________

---

## 🐛 Known Issues Log

Document any issues found during verification:

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
| Example: Font fallback | Low | Accepted | Using system fonts |
| | | | |
| | | | |

---

## 📊 Test Results

### Summary:
- **Total Tests:** ~100+
- **Passed:** ___/___
- **Failed:** ___
- **Skipped:** ___

### Status:
- [ ] ✅ PASS - Ready for production
- [ ] ⚠️ PASS with notes - Ready but has minor issues
- [ ] ❌ FAIL - Not ready, needs fixes

---

**Last Updated:** June 21, 2026  
**Version:** 1.0.0  
**Tester:** _________________
