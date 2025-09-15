export interface ISensor {
    id: string
    name: string
    location: string
    threshold: number
    lastValue?: number
    isClicked?: boolean
}
