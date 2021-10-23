{ mkYarnPackage, lib, makeWrapper }:

mkYarnPackage {
  name = "frontend";
  src = lib.cleanSourceWith {
    filter = name: type: ! lib.hasSuffix "node_modules" name;
    src = lib.cleanSource ./.;
  };
  packageJSON = ./package.json;
  yarnLock = ./yarn.lock;
}
