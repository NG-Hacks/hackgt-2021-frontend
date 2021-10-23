{
  description = "Yarn2nix based program";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/d189bf92f9be23f9b0f6c444f6ae29351bb7125c";
    utils = { url = "github:numtide/flake-utils"; };
    compat = { url = "github:edolstra/flake-compat"; flake = false; };
  };

  outputs = { self, nixpkgs, utils, compat }:
    {
      overlay = final: prev: {
        frontend = final.callPackage ./default.nix { };
      };
    } //
    (utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [
            self.overlay
          ];
        };
      in
      {
        defaultPackage = pkgs.callPackage ./default.nix { };
        devShell = pkgs.mkShell {
          buildInputs = [
            pkgs.frontend

            pkgs.yarn
            pkgs.nodejs
            pkgs.yarn2nix
          ];
        };
      })
    );
}
