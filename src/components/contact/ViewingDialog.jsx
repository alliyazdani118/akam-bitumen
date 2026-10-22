import Modal from '../ui/Modal.jsx';
import InquiryForm from './InquiryForm.jsx';

/** "Schedule a viewing" dialog, opened from a property detail page. */
export default function ViewingDialog({ open, onClose, property }) {
  if (!property) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Schedule a viewing"
      description={`Tell us when suits you and we will confirm a private viewing of ${property.title} in ${property.location}.`}
    >
      <InquiryForm
        defaultSubject="Buying a property"
        propertyId={property.id}
        propertyTitle={property.title}
        submitLabel="Request viewing"
        messagePlaceholder={`I would like to view ${property.title}. I am available on…`}
      />
    </Modal>
  );
}
