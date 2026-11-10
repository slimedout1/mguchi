# Chidori - BMW iDrive ID8 Rev Counter

Full-screen rev counter with gear display, warm-up panel, TPMS, and RPM-reactive GIF animations.

## Project Structure

```
Chidori-App/
├── apps/chidori/          # App source code
│   ├── main.js            # Main application logic
│   ├── app.json           # App metadata & signals
│   ├── icon.png           # 140×140 Sharingan icon
│   ├── gif_camgirl.pack   # GIF animation pack
│   ├── catalog.json       # MGU Store catalog
│   └── chidori@0.1.0.tgz  # Pre-built package (ID8)
├── tools/
│   └── prebuilt.js        # Build script (copies pre-built .tgz)
├── kit/
│   ├── tools/
│   │   ├── build.py       # ID8 build script
│   │   └── emu.js         # Emulator
│   ├── runtime/           # Runtime libraries (mgu, record, display, etc.)
│   ├── platform/          # Platform permissions
│   └── renderd/           # GPU renderer
├── dist/                  # Build outputs
│   ├── chidori@0.1.0.tgz  # Latest build
│   └── chidori@0.1.0.mgu  # MGU package
├── reference/
│   └── someip-interfaces.json  # SOME/IP catalog from car
├── oap-sdk/               # BMW OAP SDK
└── mgu-repo.json          # MGU Store repo config
```

## Building for ID8

### Quick rebuild (pre-built package)
```bash
# The .tgz is already built and in apps/chidori/
# Just upload to GitHub when ready
```

### Full rebuild from source
```bash
cd Chidori-App
python3 kit/tools/build.py chidori

# Strip BMW SDK
tar -xzf dist/chidori@0.1.0.tgz
rm -rf package/node_modules/oap-sdk
tar -czf dist/chidori@0.1.0.tgz -C . package/
rm -rf package

# Copy to app folder for MGU Store
cp dist/chidori@0.1.0.tgz apps/chidori/
```

### Testing in emulator
```bash
node kit/tools/emu.js chidori
```

## ID8 Build Requirements

The current build is **ID8-only** with these key features:

1. **manifest.json** - Declares both v1 AND v2 SOME/IP proxies:
   - `entrypoint2.EntryPoint2` / `EntryPointManager2`
   - `hmicontext2.HMIContext2`
   - `remote2.RemoteHmi2` / `RemoteHmiApplication2`
   - `resourcemanagement2.*`
   - `PrivateEntryPoint2`

2. **permissions.json** - Access control entries for v2 interfaces (from working cardash app)

3. **application.json** - Only declares ID8 UI:
   - Single `uiDescriptions` entry for ID8
   - `variantGroups` only lists ID8
   - No ID7 declarations

4. **UI Structure** - Only `rhmiData/uiDescriptions/ID8/` folder (no ID7)

## GitHub Publishing (MGU Store)

### Repository Structure
```
github.com/YOUR_USERNAME/mguchi/
├── mgu-repo.json
├── tools/
│   └── prebuilt.js
└── apps/
    └── chidori/
        ├── app.json
        ├── icon.png
        └── chidori@0.1.0.tgz  ← pre-built package
```

### Installation on Car
```bash
# Via MGU Store app on car
1. Add catalog: https://github.com/YOUR_USERNAME/mguchi
2. Install chidori
3. Restart HMI
```

## Current Status

- ✓ ID8 manifest with v2 proxies
- ✓ ID8 permissions from working cardash
- ✓ Only ID8 UI (no ID7)
- ✓ GIF rendering with smooth bob animation
- ✓ TPMS support
- ✓ MGU Store compatible
- ⚠️ Testing install on ID8 car

## GIF Animation

- 16-frame animation reacts to RPM
- Smooth easing (0.5 factor)
- Bob animation when RPM is stable
- 300-cell mosaic rendering
- Frame scale: 1.12x (final frame at ~89% redline)

## Notes

- Build.py is patched for ID8 (creates both ID7 and ID8 UI folders)
- The pre-built .tgz has ID7 folder removed manually for ID8-only operation
- Permissions.json is copied from iteriodev_cardash (known working ID8 app)
- No oap-sdk in distributed package
