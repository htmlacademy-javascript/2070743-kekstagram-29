import './thumbnails';
import './full-photo';
import './form';
import './pristine';
import './nouislider';
import './scale';
import './server';
import './modal';
import './sorts';
import './optimizers';
import { showAlert } from './utils';
import {loadPhotos} from './server';
import { initThumbnailSorting } from './sorts';

loadPhotos()
	.then((photos) => initThumbnailSorting(photos))
	.catch((err) => showAlert(err.message));
