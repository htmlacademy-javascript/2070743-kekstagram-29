import './thumbnails';
import './full-photo';
import './form';
import './pristine';
import './nouislider';
import './scale';
import './server';
import './modal';
import { insertPictures} from './thumbnails';
import { showAlert } from './utils';
import {loadPhotos} from './server';

loadPhotos()
	.then((photos) => insertPictures(photos))
	.catch((err) => showAlert(err.message));
