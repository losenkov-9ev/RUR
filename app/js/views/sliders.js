import { universityMatrialsSlider } from './sliders/universityMaterialsSlider.js';
import { universityGallerySlider } from './sliders/universityGallerySlider.js';
import { articleSlider } from './sliders/articleSlider.js';
import { newsSlider } from './sliders/newsSlider.js';
import { topSliderFn } from './sliders/topSlider.js';

export const initUniversityMatrialsSlider = () => universityMatrialsSlider;
export const initUniversityGallerySlider = () => universityGallerySlider;
export const initArticleSlider = () => articleSlider;
export const initTopSlider = () => topSliderFn();
export const initNewsSlider = () => newsSlider;
