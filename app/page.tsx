"use client"; // Ensure this component runs on the client-side

import React, { useState } from "react";
import Header from "./components/Header";
import FormInput from "./components/FormInput";
import EventSelection from "./components/EventSelection";
import ProceedButton from "./components/ProceedButton";
import QRCodeDisplay from "./components/QRCodeDisplay";
import ImageUpload from "./components/ImageUpload";
import SubmitButton from "./components/SubmitButton";
import { db, storage } from "./firebaseConfig"; // Import Firestore and Storage
import { v4 as uuidv4 } from "uuid"; // To generate unique IDs

const Home: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [Clgname, setClgname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [upiLink, setUpiLink] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [transactionID, setTransactionID] = useState<string>(""); 
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [emailError, setEmailError] = useState<string | null>(null); // Email validation error state
  const [contactError, setContactError] = useState<string | null>(null); // Contact validation error state

  // Event selection states
  const [slot1Selected, setSlot1Selected] = useState<string | null>(null);
  const [slot2Selected, setSlot2Selected] = useState<string | null>(null);
  const [slot3Selected, setSlot3Selected] = useState<string | null>(null);

  // Email validation using regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Contact validation: must be exactly 10 digits
  const isValidContact = (contact: string) => {
    const contactRegex = /^[0-9]{10}$/;
    return contactRegex.test(contact);
  };

  // Form validation logic
  const isFormValid =
    firstName.trim() !== "" &&
    Clgname.trim() !== "" &&
    isValidEmail(email) &&
    isValidContact(contact);
    
  const isEventSelected = slot1Selected !== null || slot2Selected !== null || slot3Selected !== null;
  const isButtonDisabled = !isFormValid || !isEventSelected;
  const isSubmitDisabled = !selectedImage || transactionID.trim() === "" || isLoading; // Disable submit if loading

  // Handle image upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  // Check if transaction ID is unique
  const checkTransactionIDUnique = async (id: string): Promise<boolean> => {
    const querySnapshot = await db.collection("registrations").where("transactionID", "==", id).get();
    return querySnapshot.empty; // If empty, transaction ID is unique
  };

  // Handle form submission and redirect to WhatsApp
  const handleSubmit = async () => {
    if (selectedImage && transactionID.trim() !== "") {
      setIsLoading(true); // Set loading state to true

      try {
        // Check if the transaction ID is unique
        const isUnique = await checkTransactionIDUnique(transactionID);
        if (!isUnique) {
          alert("Please enter valid Transaction ID.");
          setIsLoading(false);
          return;
        }

        const docId = uuidv4();
        const imageRef = storage.ref().child(`images/${docId}_${selectedImage.name}`);
        await imageRef.put(selectedImage);
        const imageUrl = await imageRef.getDownloadURL();

        const formData = {
          firstName,
          Clgname,
          email,
          contact,
          transactionID,
          imageUrl,
          events: {
            slot1Selected,
            slot2Selected,
            slot3Selected,
          },
        };

        // Store the form data in Firestore
        await db.collection("registrations").doc(docId).set(formData);
        setIsSubmitted(true);
        alert("Form submitted successfully! Press ok to Join to our whatsapp group");

        // Redirect to WhatsApp group
        const whatsappGroupLink = "https://chat.whatsapp.com/FkR22HTW4GVEl5jVxlvRG2"; // Replace with your WhatsApp group link
        window.location.href = whatsappGroupLink;
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("Error submitting the form, please try again.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!isValidEmail(value)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError(null);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContact(value);
    if (!isValidContact(value)) {
      setContactError("Contact number must be exactly 10 digits.");
    } else {
      setContactError(null);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden">
      <Header />

      <FormInput
        label="Name"
        placeholder="Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <FormInput
        label="College Name"
        placeholder="College name"
        value={Clgname}
        onChange={(e) => setClgname(e.target.value)}
      />
      <FormInput
        label="Email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && <p className="text-red-500">{emailError}</p>}
      <FormInput
        label="Contact"
        placeholder="Contact"
        value={contact}
        onChange={handleContactChange}
      />
      {contactError && <p className="text-red-500">{contactError}</p>}

      {/* Event Selection Components */}
      <EventSelection
        slotTitle="Slot 1"
        slotType="Technical Events"
        SlotTime="10:00AM - 11:30AM"
        events={[{ time: "10:00AM - 11:30AM", name: "Deep quest", type: "Technical" }]}
        selectedEvent={slot1Selected}
        onSelectionChange={setSlot1Selected}
      />
      <EventSelection
        slotTitle="Slot 1"
        slotType="Non-Technical Events"
        SlotTime="10:00AM - 11:30AM"
        events={[{ time: "10:00AM - 11:30AM", name: "IPL Auction", type: "Non-Technical" }]}
        selectedEvent={slot1Selected}
        onSelectionChange={setSlot1Selected}
      />
      {/* Slot 2 */}
      <EventSelection
        slotTitle="Slot 2"
        slotType="Technical Events"
        SlotTime="12:00PM - 1:00PM"
        events={[{time: '12:00PM - 1:00PM', name: 'Fix\'N solve feista', type: 'Technical'}]}
        selectedEvent={slot2Selected} // Track Slot 2 selection
        onSelectionChange={setSlot2Selected} // Handle Slot 2 selection change
      />
      <EventSelection
        SlotTime="12:00PM - 1:00PM"
        events={[{time: '12:00PM - 1:00PM', name: 'Poster odyssey', type: 'Technical'}]}
        selectedEvent={slot2Selected} // Track Slot 2 selection
        onSelectionChange={setSlot2Selected} // Handle Slot 2 selection change
      />
      <EventSelection
        slotType="Non-Technical Events"
        SlotTime="12:00PM - 1:00PM"
        events={[{time: '12:00PM - 1:00PM', name: 'Pixelize', type: 'Non-Technical'}]}
        selectedEvent={slot2Selected} // Track Slot 2 selection
        onSelectionChange={setSlot2Selected} // Handle Slot 2 selection change
      />
      <EventSelection
        SlotTime="12:00PM - 1:00PM"
        events={[{ time: '12:00PM - 1:00PM', name: 'Quizalicious X-O', type: 'Non-Technical'}]}
        selectedEvent={slot2Selected} // Track Slot 2 selection
        onSelectionChange={setSlot2Selected} // Handle Slot 2 selection change
      />
      <EventSelection
        slotTitle="Slot 3"
        SlotTime="2:00PM - 3:10PM"
        slotType="Technical Events"
        events={[{ time: '2:00PM - 3:10PM', name: 'Web savvy', type: 'Technical'  }]}
        selectedEvent={slot3Selected}
        onSelectionChange={setSlot3Selected}
      />
      <EventSelection
        slotType="Non-Technical Events"
        SlotTime="2:00PM - 3:10PM"
        events={[{  time: '2:00PM - 3:10PM', name: 'Adaptune', type: 'Non-Technical' }]}
        selectedEvent={slot3Selected}
        onSelectionChange={setSlot3Selected}
      />
      {!upiLink && (
        <ProceedButton
          disabled={isButtonDisabled}
          onClick={async () => {
            if (!isButtonDisabled) {
              await new Promise((resolve) => setTimeout(resolve, 0)); // Mimic async behavior
              setUpiLink("upi://pay?pa=velanvelan445@okhdfcbank&pn=EventOrganizer&am=150.00");
            }
          }}
        />
      )}

      {upiLink && <QRCodeDisplay upiLink={upiLink} />}

      {upiLink && (
        <>
          <ImageUpload selectedImage={selectedImage} onFileChange={handleFileChange} />
          {selectedImage && (
            <FormInput
              label="Transaction ID"
              placeholder="Enter Transaction ID"
              value={transactionID}
              onChange={(e) => setTransactionID(e.target.value)}
            />
          )}
          <SubmitButton onClick={handleSubmit} isSubmitted={isSubmitted} disabled={isSubmitDisabled} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default Home;
