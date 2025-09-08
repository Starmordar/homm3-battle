const path = require('path');

const SOURCE_LOD_FILE = path.join(__dirname, '../assets/source/H3sprite.lod');

const SOURCE_DIR = path.join(__dirname, '../assets/source');
const RESULT_DIR = path.join(__dirname, '../assets/result');
const CONFIG_DIR = path.join(__dirname, '../assets/config');

const FRAME_WIDTH = 220;
const FRAME_HEIGHT = 180;

const ANIMATION_GROUPS = [
  'MOVING',
  'START MOVING',
  'STOP MOVING',

  'STANDING',
  'STANDING_ACTIVE',
  'MOUSE OVER',
  'MOUSE OVER_ACTIVE',

  'GETTING HIT',
  'DEFEND',
  'DEATH',

  'TURN LEFT',
  'TURN RIGHT',

  'ATTACK UP',
  'ATTACK STRAIGHT',
  'ATTACK DOWN',

  'SHOOT UP',
  'SHOOT STRAIGHT',
  'SHOOT DOWN',
];

const MONSTER_FILE_NAMES = [
  // Castle
  'CPKMAN.def',
  'CHALBD.def',
  'CLCBOW.def',
  'CHCBOW.def',
  'CGRIFF.def',
  'CRGRIF.def',
  'CSWORD.def',
  'CCRUSD.def',
  'CMONKK.def',
  'CZEALT.def',
  'CCAVLR.def',
  'CCHAMP.def',
  'CANGEL.def',
  'CRANGL.def',

  // Dungeon
  'CTROGL.def',
  'CITROG.def',
  'CHARPY.def',
  'CHARPH.def',
  'CBEHOL.def',
  'CEVEYE.def',
  'CMEDUS.def',
  'CMEDUQ.def',
  'CMINOT.def',
  'CMINOK.def',
  'CMCORE.def',
  'CCMCOR.def',
  'CRDRGN.def',
  'CBDRGN.def',

  // Fortress
  'CGNOLL.def',
  'CGNOLM.def',
  'CPLIZA.def',
  'CALIZA.def',
  'CCGORG.def',
  'CBGOG.def',
  'CDRFLY.def',
  'CDRFIR.def',
  'CBASIL.def',
  'CGBASI.def',
  'CWYVER.def',
  'CWYVMN.def',
  'CHYDRA.def',
  'CCHYDR.def',

  // Inferno
  'CIMP.def',
  'CFAMIL.def',
  'CGOG.def',
  'CMAGOG.def',
  'CHHOUN.def',
  'CCERBU.def',
  'COHDEM.def',
  'CTHDEM.def',
  'CPFIEN.def',
  'CPFOE.def',
  'CEFREE.def',
  'CEFRES.def',
  'CDEVIL.def',
  'CADEVL.def',

  // Necropolis
  'CSKELE.def',
  'CWSKEL.def',
  'CZOMBI.def',
  'CZOMLO.def',
  'CWIGHT.def',
  'CWRAIT.def',
  'CVAMP.def',
  'CNOSFE.def',
  'CLICH.def',
  'CPLICH.def',
  'CBKNIG.def',
  'CBLORD.def',
  'CNDRGN.def',
  'CHDRGN.def',

  // Rampart
  'CCENTR.def',
  'CECENT.def',
  'CDWARF.def',
  'CBDWAR.def',
  'CELF.def',
  'CGRELF.def',
  'CPEGAS.def',
  'CAPEGS.def',
  'CTREE.def',
  'CBTREE.def',
  'CUNICO.def',
  'CWUNIC.def',
  'CGDRAG.def',
  'CDDRAG.def',

  // Stronghold
  'CGOBLI.def',
  'CHGOBL.def',
  'CBWLFR.def',
  'CUWLFR.def',
  'CORC.def',
  'CORCCH.def',
  'COGRE.def',
  'COGMAG.def',
  'CROC.def',
  'CTBIRD.def',
  'CCYCLR.def',
  'CCYCLLOR.def',
  'CYBEHE.def',
  'CABEHE.def',

  // Tower
  'CGREMA.def',
  'CGREMM.def',
  'CGARGO.def',
  'COGARG.def',
  'CSGOLE.def',
  'CIGOLE.def',
  'CMAGE.def',
  'CAMAGE.def',
  'CGENIE.def',
  'CSULTA.def',
  'CNAGA.def',
  'CNAGAG.def',
  'CLTITA.def',
  'CGTITA.def',

  // Conflux
  'CAELEM.def',
  'CEELEM.def',
  'CFELEM.def',
  'CWELEM.def',
  'CPIXIE.def',
  'CSPRITE.def',
  'CPSYEL.def',
  'CMAGEL.def',
  'CICEE.def',
  'CSTONE.def',
  'CSTORM.def',
  'CNRG.def',
  'CFBIRD.def',
  'CPHX.def',

  // Neutral
  'CGGOLE.def',
  'CDGOLE.def',
  'CADRGN.def',
  'CCDRGN.def',
  'CFDRGN.def',
  'CRSDGN.def',
  'Cench.def',
  'CSHARP.def',
  'CHALF.def',
  'CPEAS.def',
  'CBOAR.def',
  'CMUMMY.def',
  'CNOMAD.def',
  'CROGUE.def',
  'CTROLL.def',
];

module.exports = {
  SOURCE_LOD_FILE,
  SOURCE_DIR,
  RESULT_DIR,
  CONFIG_DIR,

  ANIMATION_GROUPS,
  MONSTER_FILE_NAMES,

  FRAME_WIDTH,
  FRAME_HEIGHT,
};
