import axios from "axios";
import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getCookie } from "typescript-cookie";

interface Props {
  onCancel: () => {};
  rspID: string | undefined;
}

function ReviewModal({ onCancel, rspID }: Props) {
  const [ratingVal, setRatingVal] = useState(0);
  const [pricingVal, setPricingVal] = useState(0);

  const commentRef = useRef<HTMLTextAreaElement>(null);

  function changeRating(val: number) {
    setRatingVal(val);
  }
  function changePricing(val: number) {
    setPricingVal(val);
  }

  function reviewHandler() {
    const commentValue = commentRef.current?.value;
    const reviewData = {
      userID: getCookie("UID-cookie"),
      rspID: rspID,
      rating: ratingVal,
      priceRating: pricingVal,
      comment: commentValue,
    };
    axios
      .post("http://localhost:8800/review", reviewData)
      .then((res) => {
        console.log(res.data);
        onCancel();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Modal.Header closeButton onClick={onCancel}>
        <Modal.Title>Leave a review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <h6>Rate the service:</h6>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Check
              inline
              label="1"
              type="radio"
              id="inline-rating-1"
              name="ratingGroup"
              onChange={() => changeRating(1)}
            />
            <Form.Check
              inline
              label="2"
              type="radio"
              id="inline-rating-2"
              name="ratingGroup"
              onChange={() => changeRating(2)}
            />
            <Form.Check
              inline
              label="3"
              type="radio"
              id="inline-rating-3"
              name="ratingGroup"
              onChange={() => changeRating(3)}
            />
            <Form.Check
              inline
              label="4"
              type="radio"
              id="inline-rating-4"
              name="ratingGroup"
              onChange={() => changeRating(4)}
            />
            <Form.Check
              inline
              label="5"
              type="radio"
              id="inline-rating-5"
              name="ratingGroup"
              onChange={() => changeRating(5)}
            />
          </Form.Group>
          <h6>Rate the pricing:</h6>
          <Form.Group className="mb-3" controlId="FormGroup2">
            <Form.Check
              inline
              label="1"
              type="radio"
              id="inline-pricing-1"
              name="pricingGroup"
              onChange={() => changePricing(1)}
            />
            <Form.Check
              inline
              label="2"
              type="radio"
              id="inline-pricing-2"
              name="pricingGroup"
              onChange={() => changePricing(2)}
            />
            <Form.Check
              inline
              label="3"
              type="radio"
              id="inline-pricing-3"
              name="pricingGroup"
              onChange={() => changePricing(3)}
            />
            <Form.Check
              inline
              label="4"
              type="radio"
              id="inline-pricing-4"
              name="pricingGroup"
              onChange={() => changePricing(4)}
            />
            <Form.Check
              inline
              label="5"
              type="radio"
              id="inline-pricing-5"
              name="pricingGroup"
              onChange={() => changePricing(5)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="commentTextarea">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              style={{ resize: "none" }}
              rows={3}
              ref={commentRef}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Close
        </Button>
        <Button variant="primary" onClick={reviewHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </div>
  );
}

export default ReviewModal;
