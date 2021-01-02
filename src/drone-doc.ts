export interface DroneDoc {
    steps: (TemplateStep | DroneStep)[]
}

export interface DroneStep {
    [key: string]: string
}

export interface TemplateStep {
    template: string
    [key: string]: string
}