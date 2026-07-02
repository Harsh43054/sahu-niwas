/**
 * Sahu Niwas - Student Rental Rooms
 * Website Configuration File
 * 
 * ADMINS: You can easily edit these values to update prices, phone numbers,
 * links, addresses, and images on the website without modifying the HTML/CSS code.
 */

const SAHU_NIWAS_CONFIG = {
  // === Contact Information ===
  phone: "+918573058693",          // Display phone number (e.g., "+91 XXXXX XXXXX")
  phoneRaw: "+918573058693",         // Raw phone number for tel: links (no spaces or hyphens)
  
  whatsapp: "+919335169651",       // Display WhatsApp number
  whatsappRaw: "+919335169651",       // Raw WhatsApp number for chat link (include country code, e.g., "91XXXXXXXXXX")
  whatsappMessage: "Hello Sahu Niwas! I am interested in booking a room. Please provide more details.", // Pre-filled chat message
  
  email: "contactsahuniwas@gmail.com",    // Contact email address
  address: "Sahu Niwas, Near Mangal Maitri Hospital, Jhansi Uttar Pradesh, 284001", // Full physical address
  
  // === Rent Information (Monthly) ===
  rooms: {
    single: {
      minRent: "2500",
      maxRent: "3000",
      type: "Standard Single Room"
    },
    attached: {
      minRent: "3000",
      maxRent: "3500",
      type: "Premium Attached Room"
    }
  },

  // Google Maps Section
googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.199573274278!2d78.63630049999999!3d25.4650106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397777837120e519%3A0x2393f6279b6ebfc0!2sSahu%20Niwas!5e0!3m2!1sen!2sin!4v1782972853628!5m2!1sen!2sin",

// Google Maps Direct Directions URL
googleMapsDirectionsUrl: "https://maps.app.goo.gl/dbciXuNDiafManv57",
  // Google Forms Section
  // To get this link, click "Send" in your Google Form, select the Embed tab (< >),
  // and copy the URL inside the src attribute of the iframe.
  googleFormEmbedUrl: "https://forms.gle/u62FGzXrmcDSvFVJ8",
  
  // Direct Google Form link (used if embed fails or for the "Fill Enquiry Form" buttons)
  googleFormDirectUrl: "https://forms.gle/u62FGzXrmcDSvFVJ8",
  // === Dynamic Gallery Configurations ===
  // You can add more image file paths here. The layout handles any number of images automatically.
  // Use relative paths to images placed in the "images" folder, or absolute online URLs.
 gallery: {
  single: [
    {
      url: "images/single_room.png",
      title: "Standard Single Room",
      description: "Comfortable and well-ventilated room, ideal for students with a peaceful study environment."
    }
  ],

  attached: [
    {
      url: "images/attached_room.png",
      title: "Premium Attached Room",
      description: "Spacious room with an attached bathroom and kitchen, offering greater privacy and convenience."
    }
  ],

  property: [
    {
      url: "images/Home.png",
      title: "Sahu Niwas Exterior View",
      description: "Front view of Sahu Niwas located in a calm, green, and student-friendly environment."
    },
    {
      url: "images/Road.jpeg",
      title: "Main Road Connectivity",
      description: "Easy access to main road with nearby transport and daily essential facilities."
    }
  ],

  garden: [
    {
      url: "images/garden_property.png",
      title: "Green Garden Area",
      description: "Peaceful green garden space for relaxation and fresh environment."
    },
    {
      url: "images/inside_property.png",
      title: "Secure Property Entrance",
      description: "Well-maintained entrance with CCTV surveillance ensuring safety and security."
    }
  ]
}
};
 