type Task = () => Promise<unknown>

class ConcurrentQueue {
  #tasks: Task[] = []
  #concurrency = 0
  readonly maxConcurrency: number

  constructor(maxConcurrency?: number) {
    this.maxConcurrency = maxConcurrency ?? Infinity
  }

  get concurrency(): number {
    return this.#concurrency
  }

  enqueue(task: Task): void {
    this.#tasks.push(task)
    this.tryDequeue()
  }

  tryDequeue(): void {
    if (this.#concurrency < this.maxConcurrency) {
      const task = this.#tasks.shift()

      if (task === undefined) return

      ++this.#concurrency

      task().finally(() => {
        --this.#concurrency

        this.tryDequeue()
      })
    }
  }
}

export default ConcurrentQueue
