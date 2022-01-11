const questions = [
    "What job are you? (Please enter in the abbreviated format. For instance, if you are a Paladin, please type pld.)",
    "Which of these is the BIS for your weapon? (Please respond to the following questions by typing either 1 or 2.)",
    "Which of these is the BIS for your head?",
    "Which of these is the BIS for your body?",
    "Which of these is the BIS for your hands?",
    "Which of these is the BIS for your legs?",
    "Which of these is the BIS for your feet?",
    "Which of these is the BIS for your ears?",
    "Which of these is the BIS for your neck?",
    "Which of these is the BIS for your wrists?",
    "Which of these is the BIS for your first ring?",
    "Which of these is the BIS for your second ring?"
]

const jobs = ["pld", "war", "drk", "gnb", "drg", "rpr", "mnk", "sam", "nin", "brd", "mch", "dnc", "blm", "smn", "rdm", "whm", "sch", "ast", "sge"];

const tanks = ["pld", "war", "drk", "gnb"]
const heals = ["whm", "sch", "ast", "sge"]
const meleeMaiming = ["rpr", "drg"]
const meleeStriking = ["sam", "mnk"]
const meleeScouting = ["nin"]
const physRange = ["brd", "mch", "dnc"]
const magRange = ["blm", "smn", "rdm"]

const weapons = {
  "PLD": {
    tome: "Augmented Radiant's Bastard Sword & Shield",
    raid: "Asphodelos Longsword & Shield",
  },
  "WAR": {
    tome: "Augmented Radiant's Battleaxe",
    raid: "Asphodelos War Hammer",
  },
  "DRK": {
    tome: "Augmented Radiant's Greatsword",
    raid: "Asphodelos Claymore",
  },
  "GNB": {
    tome: "Augmented Radiant's Bayonet",
    raid: "Asphodelos Bayonet",
  },
  "DRG": {
    tome: "Augmented Radiant's Partisan",
    raid: "Asphodelos Trident",
  },
  "RPR": {
    tome: "Augmented Radiant's War Scythe",
    raid: "Asphodelos War Scythe",
  },
  "MNK": {
    tome: "Augmented Radiant's Baghnakhs",
    raid: "Asphodelos Knuckles",
  },
  "SAM": {
    tome: "Augmented Radiant's Blade",
    raid: "Asphodelos Samurai Blade",
  },
  "NIN": {
    tome: "Augmented Radiant's Sword Breakers",
    raid: "Asphodelos Daggers",
  },
  "BRD": {
    tome: "Augmented Radiant's Composite Bow",
    raid: "Asphodelos Harp Bow",
  },
  "MCH": {
    tome: "Augmented Radiant's Pistol",
    raid: "Asphodelos Arquebus",
  },
  "DNC": {
    tome: "Augmented Radiant's Chakrams",
    raid: "Asphodelos Tathlums",
  },
  "BLM": {
    tome: "Augmented Radiant's Scepter",
    raid: "Asphodelos Staff",
  },
  "SMN": {
    tome: "Augmented Radiant's Grimoire",
    raid: "Asphodelos Grimoire",
  },
  "RDM": {
    tome: "Augmented Radiant's Rapier",
    raid: "Asphodelos Foil",
  },
  "WHM": {
    tome: "Augmented Radiant's Cane",
    raid: "Asphodelos Cane",
  },
  "SCH": {
    tome: "Augmented Radiant's Codex",
    raid: "Asphodelos Codex",
  },
  "AST": {
    tome: "Augmented Radiant's Torquetum",
    raid: "Asphodelos Orrery",
  },
  "SGE": {
    tome: "Augmented Radiant's Milpreves",
    raid: "Asphodelos Pendulums",
  },
};

const head = {
    Tank: {
        tome: "Augmented Radiant's Helm of Fending",
        raid: "Asphodelos Circlet of Fending"
    },
    Heals: {
        tome: "Augmented Radiant's Visor of Healing",
        raid: "Asphodelos Headgear of Healing"
    },
    Melee: {
        Maiming: {
            tome: "Augmented Radiant's Helm of Maiming",
            raid: "Asphodelos Faceguard of Maiming"
        },
        Striking: {
            tome: "Augmented Radiant's Mask of Striking",
            raid: "Asphodelos Faceguard of Striking"
        },
        Scouting: {
            tome: "Augmented Radiant's Visor of Scouting",
            raid: "Asphodelos Headgear of Scouting"
        }
    },
    PhysRange: {
        tome: "Augmented Radiant's Mask of Aiming",
        raid: "Asphodelos Headgear of Aiming"
    },
    MagRange: {
        tome: "Augmented Radiant's Visor of Casting",
        raid: "Asphodelos Headgear of Casting"
    }
}

const body = {
    Tank: {
        tome: "Augmented Radiant's Scale Mail of Fending",
        raid: "Asphodelos Chiton of Fending"
    },
    Heals: {
        tome: "Augmented Radiant's Mail of Healing",
        raid: "Asphodelos Chiton of Healing"
    },
    Melee: {
        Maiming: {
            tome: "Augmented Radiant's Scale Mail of Maiming",
            raid: "Asphodelos Himation of Maiming"
        },
        Striking: {
            tome: "Augmented Radiant's Mail of Striking",
            raid: "Asphodelos Himation of Striking"
        },
        Scouting: {
            tome: "Augmented Radiant's Mail of Scouting",
            raid: "Asphodelos Himation of Scouting"
        }
    },
    PhysRange: {
        tome: "Augmented Radiant's Mail of Aiming",
        raid: "Asphodelos Himation of Aiming"
    },
    MagRange: {
        tome: "Augmented Radiant's Mail of Healing",
        raid: "Asphodelos Chiton of Casting"
    }
}

const hands = {
    Tank: {
        tome: "Augmented Radiant's Gauntlets of Fending",
        raid: "Asphodelos Vambraces of Fending"
    },
    Heals: {
        tome: "Augmented Radiant's Gloves of Healing",
        raid: "Asphodelos Wristbands of Healing"
    },
    Melee: {
        Maiming: {
            tome: "Augmented Radiant's Gauntlets of Maiming",
            raid: "Asphodelos Halfgloves of Maiming"
        },
        Striking: {
            tome: "Augmented Radiant's Wristgloves of Striking",
            raid: "Asphodelos Halfgloves of Striking"
        },
        Scouting: {
            tome: "Augmented Radiant's Gloves of Scouting",
            raid: "Asphodelos Gloves of Scouting"
        }
    },
    PhysRange: {
        tome: "Augmented Radiant's Wristgloves of Aiming",
        raid: "Asphodelos Gloves of Aiming"
    },
    MagRange: {
        tome: "Augmented Radiant's Gloves of Casting",
        raid: "Asphodelos Wristbands of Casting"
    }
}

const legs = {
    Tank: {
        tome: "Augmented Radiant's Cuisses of Fending",
        raid: "Asphodelos Skirt of Fending"
    },
    Heals: {
        tome: "Augmented Radiant's Hose of Healing",
        raid: "Asphodelos Trousers of Healing"
    },
    Melee: {
        Maiming: {
            tome: "Augmented Radiant's Cuisses of Maiming",
            raid: "Asphodelos Breeches of Maiming"
        },
        Striking: {
            tome: "Augmented Radiant's Hose of Striking",
            raid: "Asphodelos Breeches of Striking"
        },
        Scouting: {
            tome: "Augmented Radiant's Hose of Scouting",
            raid: "Asphodelos Hose of Scouting"
        }
    },
    PhysRange: {
        tome: "Augmented Radiant's Hose of Aiming",
        raid: "Asphodelos Hose of Aiming"
    },
    MagRange: {
        tome: "Augmented Radiant's Hose of Casting",
        raid: "Asphodelos Trousers of Casting"
    }
}

const feet = {
    Tank: {
        tome: "Augmented Radiant's Sabatons of Fending",
        raid: "Asphodelos Boots of Fending"
    },
    Heals: {
        tome: "Augmented Radiant's Greaves of Healing",
        raid: "Asphodelos Gaiters of Healing"
    },
    Melee: {
        Maiming: {
            tome: "Augmented Radiant's Sabatons of Maiming",
            raid: "Asphodelos Shoes of Maiming"
        },
        Striking: {
            tome: "Augmented Radiant's Sabatons of Striking",
            raid: "Asphodelos Shoes of Striking"
        },
        Scouting: {
            tome: "Augmented Radiant's Greaves of Scouting",
            raid: "Asphodelos Boots of Scouting"
        }
    },
    PhysRange: {
        tome: "Augmented Radiant's Sabatons of Aiming",
        raid: "Asphodelos Boots of Aiming"
    },
    MagRange: {
        tome: "Augmented Radiant's Greaves of Casting",
        raid: "Asphodelos Gaiters of Casting"
    }
}

const ears = {
    Tank: {
        tome: "Augmented Radiant's Earrings of Fending",
        raid: "Asphodelos Earrings of Fending"
    },
    Heals: {
        tome: "Augmented Radiant's Earrings of Healing",
        raid: "Asphodelos Earrings of Healing"
    },
    Melee: {
        Slaying: {
            tome: "Augmented Radiant's Earrings of Slaying",
            raid: "Asphodelos Earrings of Slaying"
        },
        Aiming: {
            tome: "Augmented Radiant's Earrings of Aiming",
            raid: "Asphodelos Earrings of Aiming"
        }
    },
    PhysRange: {
        tome: "Augmented Radiant's Earrings of Aiming",
        raid: "Asphodelos Earrings of Aiming"
    },
    MagRange: {
        tome: "Augmented Radiant's Earrings of Casting",
        raid: "Asphodelos Earrings of Casting"
    }
}

const neck = {
    Tank: {
        tome: "Augmented Radiant's Choker of Fending",
        raid: "Asphodelos Necklace of Fending"
    },
    Heals: {
        tome: "Augmented Radiant's Choker of Healing",
        raid: "Asphodelos Necklace of Healing"
    },
    Melee: {
        Slaying: {
            tome: "Augmented Radiant's Choker of Slaying",
            raid: "Asphodelos Necklace of Slaying"
        },
        Aiming: {
            tome: "Augmented Radiant's choker of Aiming",
            raid: "Asphodelos Necklace of Aiming"
        }
    },
    PhysRange: {
        tome: "Augmented Radiant's Choker of Aiming",
        raid: "Asphodelos Necklace of Aiming"
    },
    MagRange: {
        tome: "Augmented Radiant's Choker of Casting",
        raid: "Asphodelos Necklace of Casting"
    }
}

const wrists = {
    Tank: {
        tome: "Augmented Radiant's Bracelet of Fending",
        raid: "Asphodelos Amulet of Fending"
    },
    Heals: {
        tome: "Augmented Radiant's Bracelet of Healing",
        raid: "Asphodelos Amulet of Healing"
    },
    Melee: {
        Slaying: {
            tome: "Augmented Radiant's Bracelet of Slaying",
            raid: "Asphodelos Amulet of Slaying"
        },
        Aiming: {
            tome: "Augmented Radiant's Bracelet of Aiming",
            raid: "Asphodelos Amulet of Aiming"
        }
    },
    PhysRange: {
        tome: "Augmented Radiant's Bracelet of Aiming",
        raid: "Asphodelos Amulet of Aiming"
    },
    MagRange: {
        tome: "Augmented Radiant's Bracelet of Casting",
        raid: "Asphodelos Amulet of Casting"
    }
}

const ring0 = {
    Tank: {
        tome: "Augmented Radiant's Ring of Fending",
        raid: "Asphodelos Ring of Fending"
    },
    Heals: {
        tome: "Augmented Radiant's Ring of Healing",
        raid: "Asphodelos Ring of Healing"
    },
    Melee: {
        Slaying: {
            tome: "Augmented Radiant's Ring of Slaying",
            raid: "Asphodelos Ring of Slaying"
        },
        Aiming: {
            tome: "Augmented Radiant's Ring of Aiming",
            raid: "Asphodelos Ring of Aiming"
        }
    },
    PhysRange: {
        tome: "Augmented Radiant's Ring of Aiming",
        raid: "Asphodelos Ring of Aiming"
    },
    MagRange: {
        tome: "Augmented Radiant's Ring of Casting",
        raid: "Asphodelos Ring of Casting"
    }
}

const ring1 = {
    Tank: {
        tome: "Augmented Radiant's Ring of Fending",
        raid: "Asphodelos Ring of Fending"
    },
    Heals: {
        tome: "Augmented Radiant's Ring of Healing",
        raid: "Asphodelos Ring of Healing"
    },
    Melee: {
        Slaying: {
            tome: "Augmented Radiant's Ring of Slaying",
            raid: "Asphodelos Ring of Slaying"
        },
        Aiming: {
            tome: "Augmented Radiant's Ring of Aiming",
            raid: "Asphodelos Ring of Aiming"
        }
    },
    PhysRange: {
        tome: "Augmented Radiant's Ring of Aiming",
        raid: "Asphodelos Ring of Aiming"
    },
    MagRange: {
        tome: "Augmented Radiant's Ring of Casting",
        raid: "Asphodelos Ring of Casting"
    }
}

module.exports = {
    questions,
    jobs,
    tanks,
    heals,
    meleeMaiming,
    meleeStriking,
    meleeScouting,
    physRange,
    magRange,
    weapons,
    head,
    body,
    hands,
    legs,
    feet,
    ears,
    neck,
    wrists,
    ring0,
    ring1
}