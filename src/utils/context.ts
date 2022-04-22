import type {TunicPhrase} from "@/utils/tunic";

export interface ContextData {
  phrases?: ContextPhrase[];
}

export interface ContextPhrase {
  phrase: TunicPhrase;
  notes: string;
}