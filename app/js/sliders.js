import { articleSlider } from './sliders/articleSlider.js';
import { newsSlider } from './sliders/newsSlider.js';
import { topSliderFn } from './sliders/topSlider.js';
import { universityGallerySlider } from './sliders/universityGallerySlider.js';
import { universityMatrialsSlider } from './sliders/universityMaterialsSlider.js';

export const initNewsSlider = () => newsSlider;
export const initTopSlider = () => topSliderFn();
export const initUniversityGallerySlider = () => universityGallerySlider;
export const initUniversityMatrialsSlider = () => universityMatrialsSlider;
export const initArticleSlider = () => articleSlider;
