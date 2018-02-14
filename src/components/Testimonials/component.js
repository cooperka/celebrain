// @flow

import React from 'react';

import './styles.css';

function Testimonials() {
  return (
    <div className="Testimonials page">
      <div className="title">Testimonials</div>
      <div className="section">
        <div className="quote">
          {'"Kevin is an anti-entropy machine. He solves problems creatively, with intelligence and and ease. A special type of person: Kevin is collaborative, patient, and fiercely productive."'}
        </div>
        <div className="attribution">Oscar Fossum, WeCount</div>
        <div className="date">December 2017</div>
      </div>
      <div className="section">
        <div className="quote">
          {'"Kevin is meticulous in his thinking when solving difficult problems. I was impressed with the clarity of thought he exhibited. Kevin is really process oriented and has shown great leadership skills."'}
        </div>
        <div className="attribution">Karnesh Mehra, Yahoo</div>
        <div className="date">June 2016</div>
      </div>
      <div className="section">
        <div className="quote">
          {'"Kevin was instrumental in establishing our project management systems, deciding on the best languages and softwares to use, and tactfully engaging with volunteer teammates to complete tasks."'}
        </div>
        <div className="attribution">Oscar Fossum, WeCount</div>
        <div className="date">December 2017</div>
      </div>
      <div className="section">
        <div className="quote">
          {'"Kevin was concerned with not only the business operations of the company but also the social and ethical aspects. I would love to work with him in the future."'}
        </div>
        <div className="attribution">Torehan Sharman, Cribspot</div>
        <div className="date">January 2018</div>
      </div>
    </div>
  );
}

export default Testimonials;
