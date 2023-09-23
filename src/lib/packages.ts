import { spawnSync } from "child_process";

export const installPackages = (packages: string[], dev: boolean = false, cwd: string = process.cwd()) => {
    const args = ['install', '--prefix', cwd, ...packages];
    if (dev) {
        args.push('--save-dev');
    }
    spawnSync(`npm ${args.join(' ')}`, { stdio: 'inherit', shell: true });
}