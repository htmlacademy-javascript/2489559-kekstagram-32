import { similarPosts } from './data.js';
import { renderGallery } from './gallery.js';
import './upload-form.js';

renderGallery(similarPosts());
