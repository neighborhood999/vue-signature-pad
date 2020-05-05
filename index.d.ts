import { Vue, VueConstructor } from 'vue/types/vue'
import { PluginFunction } from 'vue'
import SignaturePad, { IOptions, IPointGroup } from 'signature_pad';

export type ImageTypes = 'image/png' | 'image/jpeg' | 'image/svg+xml';

export interface SignaturePadOptions {
  width?: string
  height?: string
  customStyle?: object
  options?: IOptions
  images?: string[]
  signaturePad: SignaturePad
  cacheImages: string[]
  signatureData: string
  onResizeHandler?: () => void | undefined
}

export interface ISignaturePad {
  resizeCanvas(): void;
  saveSignature(
    type: ImageTypes,
    encoderOptions?: number
  ): { isEmpty: boolean; data: string };
  undoSignature(): void;
  mergeImageAndSignature(customSignature: any): Promise<string>;
  addImages(images: string[]): Promise<string>;
  fromDataURL(
    dataUrl: string,
    options: { ratio?: number; width?: number; height?: number },
    callback?: (error?: string | Event) => void
  ): void;
  fromData(pointGroups: IPointGroup[]): void;
  toData(): IPointGroup[];
  lockSignaturePad(): void;
  openSignaturePad(): void;
  isEmpty(): boolean;
  getPropImagesAndCacheImages(): string[];
  clearCacheImages(): string[];
  clearSignature(): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $signaturePad: ISignaturePad;
  }
  interface VueConstructor {
    signaturePad: ISignaturePad;
  }
}

declare class VueSignaturePad {
  static install: PluginFunction<any>;
}

export default VueSignaturePad
