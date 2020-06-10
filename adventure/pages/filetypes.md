'Archive', '35Floppy', '525Floppy', 'CDISO', 'DVDISO', 'VPC', 'VMWARE', 'VBOX', 'Tape', 'Document', 'Artwork', '8Floppy', 'Executable', 'SelfExtracting', 'Firmware'

### Archive

An _Archive_ is a collection of loose files that _cannot be fit into any other category._ It has to be multiple files, and it must be impossible to fit all of them cleanly into another filetype.

If there are multiple files, but they are all of one type, then that is the type, not Archive.
If the files were everything that was on a floppy instead of a bit-for-bit image of the floppy, that's an Archive.
If a program was installed, then the contents of the install folder zipped up, that's an Archive.

**CRITICALLY:** A file is *NEVER* an Archive simply because it is a compressed file. Nearly everything on the site is compressed!
A CD ISO in a ZIP is _CD_ type. A collection of 3.5" floppy images in a ZIP, split into folders but still in IMG format, is _3.5" Floppy_ type. Archive _solely_ describes a file that extracts to _multiple types of file_.

Also, Archive does not apply simply because there is an included supplemental document. A ZIP with an ISO, and then a TXT serial number or PDF manual is still ISO type.

### Self-Extracting Executable

A _Self-Extracting Executable_ is any EXE that, when run, simply extracts a bunch of files, *especially* if it doesn't warn the user before doing so.

A good rule of thumb is that such an EXE will not be branded by the actual program vendor, nor will it ask the user program-specific questions like "where to install?" For instance, DOOM's DEICE does not count, because it knows it's a game installer, not just a file extractor, _and_ it warns the user before installing.

Another way to say this: It's a self-extracting executable if it'll open in 7Zip _and_ all files will extract. InstallShield or Windows Installer files for instance usually don't pass this test - they'll open and something will extract, but it's not a usable program.

### Executable

An _Executable_ is one of the following:

- A program, ready to run, like CALC.EXE
- An EXE that installs a program or extracts files _as long as_ it does not match the description of a self-extracting executable.

### 3.5" Floppy - 5.25" Floppy - 8" Floppy

An image - a bit-for-bit copy - of a floppy disk created with any of a variety of utilities.

This is _not_ the contents of a floppy that have been copied off with something _other_ than an imaging utility.

Common extensions are IMA, IMG, IMZ, IMD, and on Mac, DMG.

IMG is preferred.

### CD ISO - DVD ISO

Just like floppies, this is a bit-for-bit copy of a CD or DVD. ISO, BIN/CUE, MDS/MDF, and a thousand other formats.

ISO or BIN/CUE are preferred.

### Virtual PC, VMWare, VirtualBox

A copy of a given OS installed and ready to use on a virtual machine image.

### Tape

A bit-for-bit copy of a tape.

### Document

One or more documents in any of many formats, Document meaning:

- Manuals
- Pamphlets
- Catalogs
- Cheat sheets (like keyboard references)

PDF format is preferred.

Remember that a ZIP collection of these is type Document, not Archive.

### Artwork

One or more pieces of graphic art relating to a program in any of many formats, Artwork meaning scans of:

- Box art
- Disk label
- Disk sleeve
- Any other picture related to a program that was produced by the vendor

Preferred format PNG.

### Firmware

A bit-for-bit image meant to be burned to a ROM chip or flashed to a memory card.
