import type { Job } from "./job.interface";

export class JobRegistry {
  private readonly jobs = new Map<string, Job>();

  register(job: Job): void {
    this.jobs.set(job.name, job);
  }

  get(name: string): Job {
    const job = this.jobs.get(name);

    if (!job) {
      throw new Error(`Job '${name}' not registered`);
    }

    return job;
  }

  list(): Job[] {
    return [...this.jobs.values()];
  }
}
