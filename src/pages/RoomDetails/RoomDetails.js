import './RoomDetails.scss';
import Header from '../../blocks/header/header';
import Diagram from '../../blocks/diagram/diagram';
import RoomBooker from '../../blocks/room-preview/room-preview';
import Review from '../../blocks/review/review';

document.addEventListener('DOMContentLoaded', handlerDocumentDomLoaded);

function handlerDocumentDomLoaded() {
  /* eslint-disable no-unused-vars */
  const headerObject = new Header(document.querySelector('.js-header'));
  const diagramObject = new Diagram();
  const bookerObject = new RoomBooker(document.querySelector('.room-preview'));
  document.querySelectorAll('.js-review').forEach((review) => {
    const reviewObject = new Review(review);
  });
}
