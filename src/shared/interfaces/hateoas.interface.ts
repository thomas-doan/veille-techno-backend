export interface Application {
    name: string;
    version: string;
    authority: string;
    state: State;
}

export interface State {
    name: string;
    type: string;
    resource: string;
    transitions: HateoasLink[];
}

export interface Transition {
    type: string; // par exemple, "collection"
    resource: string;
    method: string; // par exemple, "GET"
}

export interface HateoasLink {
    href: string;
    rel: string;
    type: string;
  }

