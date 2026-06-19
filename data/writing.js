"use strict";

/*
====================================================
IELTS GENERAL WRITING TASK 1 DATA
Designed for:
- Clean rendering
- Smart search
- IELTS General Training Task 1 practice
- Professional card-based UI

Each object contains:
title  -> card title
prompt -> full writing task prompt
====================================================
*/

window.writingTopics = [

  {
    title: "Invite a Friend to Visit Your City",
    prompt: "You recently moved to a new city and would like to invite an old friend to visit you. Write a letter to your friend. In your letter, describe your new city, explain why your friend would enjoy visiting, and suggest a suitable time for the visit."
  },

  {
    title: "Complain About Noise in Your Neighborhood",
    prompt: "You have recently been disturbed by loud noise from a nearby house. Write a letter to your neighbor. In your letter, explain the problem, describe how it has affected you, and suggest what you would like your neighbor to do."
  },

  {
    title: "Thank a Colleague for Help",
    prompt: "A colleague recently helped you complete an important project at work. Write a letter to your colleague. In your letter, thank them for their help, explain why their support was important, and say how you would like to return the favor."
  },

  {
    title: "Request Time Off Work",
    prompt: "You need to take some time off work for personal reasons. Write a letter to your manager. In your letter, explain why you need time off, state the dates you will be away, and describe how your work will be handled during your absence."
  },

  {
    title: "Return a Faulty Product",
    prompt: "You recently bought a product from a store, but it does not work properly. Write a letter to the store manager. In your letter, describe the product, explain the problem, and say what action you would like the store to take."
  },

  {
    title: "Invite a Friend to a Family Celebration",
    prompt: "Your family is planning a special celebration and you would like to invite a friend. Write a letter to your friend. In your letter, explain what the celebration is, say why you want your friend to attend, and give details about the date and location."
  },

  {
    title: "Lost an Item on Public Transport",
    prompt: "You lost a personal item while traveling on public transport. Write a letter to the transport company. In your letter, describe the item, explain when and where you lost it, and ask what steps can be taken to find it."
  },

  {
    title: "Recommend a Friend for a Job",
    prompt: "A company you know is looking for a new employee, and you would like to recommend your friend for the position. Write a letter to the company manager. In your letter, explain how you know your friend, describe their skills, and say why they would be suitable for the job."
  },

  {
    title: "Apologize to a Neighbor",
    prompt: "You recently caused a problem for your neighbor. Write a letter to your neighbor. In your letter, apologize for the problem, explain what happened, and say what you will do to prevent it from happening again."
  },

  {
    title: "Ask for Information About a Course",
    prompt: "You are interested in taking a short course at a local college. Write a letter to the course administrator. In your letter, explain which course you are interested in, ask about the schedule and fees, and request information about how to enroll."
  },

  {
    title: "Suggest Improvements to a Local Park",
    prompt: "You often visit a local park, but you think it needs some improvements. Write a letter to your local council. In your letter, describe the park, explain what problems you have noticed, and suggest improvements that could be made."
  },

  {
    title: "Complain About Internet Service",
    prompt: "You have been experiencing problems with your internet connection. Write a letter to your internet service provider. In your letter, describe the problems, explain how they have affected you, and ask the company to fix the issue."
  },

  {
    title: "Borrow Equipment From a Friend",
    prompt: "You need to borrow some equipment from a friend for an event. Write a letter to your friend. In your letter, explain what equipment you need, say why you need it, and tell your friend when you will return it."
  },

  {
    title: "Thank a Teacher",
    prompt: "A teacher recently helped you improve your skills or confidence. Write a letter to your teacher. In your letter, thank them for their support, explain how they helped you, and say how this has benefited you."
  },

  {
    title: "Complain About a Hotel Stay",
    prompt: "You recently stayed at a hotel and were not satisfied with your experience. Write a letter to the hotel manager. In your letter, describe when you stayed at the hotel, explain what went wrong, and say what you would like the manager to do."
  },

  {
    title: "Ask About a Job Advertisement",
    prompt: "You saw an advertisement for a job that interests you. Write a letter to the employer. In your letter, explain which job you are interested in, describe your relevant experience, and ask for more information about the position."
  },

  {
    title: "Tell a Friend About Moving House",
    prompt: "You have recently moved to a new home. Write a letter to a friend. In your letter, explain why you moved, describe your new home, and invite your friend to visit."
  },

  {
    title: "Offer Help for a Local Event",
    prompt: "Your local community is organizing an event, and you would like to help. Write a letter to the organizer. In your letter, explain why you are interested in helping, describe what skills you can offer, and ask how you can get involved."
  },

  {
    title: "Apply for Library Membership",
    prompt: "You have recently moved to a new area and want to join the local library. Write a letter to the librarian. In your letter, introduce yourself, explain why you want to join, and ask about membership requirements."
  },

  {
    title: "Ask a Friend for Advice About Studying Abroad",
    prompt: "You are planning to study abroad and would like advice from a friend who has already done so. Write a letter to your friend. In your letter, explain your plans, ask for advice about studying overseas, and request information about living costs."
  },

  {
    title: "Complain About a Delayed Bus or Train",
    prompt: "You were recently delayed because of a problem with public transport. Write a letter to the transport company. In your letter, describe the journey, explain how the delay affected you, and ask for an explanation or compensation."
  },

  {
    title: "Congratulate a Friend on an Achievement",
    prompt: "Your friend has recently achieved something important. Write a letter to your friend. In your letter, congratulate them, say why their achievement is impressive, and suggest a way to celebrate."
  },

  {
    title: "Apply for a Volunteering Opportunity",
    prompt: "You saw an advertisement asking for volunteers. Write a letter to the organization. In your letter, explain why you want to volunteer, describe your relevant skills or experience, and say when you are available."
  },

  {
    title: "Give Feedback About a Restaurant",
    prompt: "You recently ate at a restaurant and had a positive experience. Write a letter to the restaurant manager. In your letter, describe your visit, explain what you liked about the restaurant, and mention any suggestions for improvement."
  },

  {
    title: "Welcome a New Neighbor",
    prompt: "A new neighbor has recently moved into your street. Write a letter to welcome them. In your letter, introduce yourself, describe the local area, and offer to help them settle in."
  },

  {
    title: "Book a Hall for an Event",
    prompt: "You are planning an event and want to book a community hall. Write a letter to the hall manager. In your letter, explain what kind of event you are organizing, say when you need the hall, and ask about facilities and prices."
  },

  {
    title: "Organize a School Reunion",
    prompt: "You are helping to organize a reunion for former classmates. Write a letter to an old classmate. In your letter, explain the purpose of the reunion, give details about the date and place, and ask whether they can attend."
  },

  {
    title: "Complain About Car Repair Service",
    prompt: "You recently had your car repaired, but you are not satisfied with the service. Write a letter to the garage manager. In your letter, describe the repair, explain the problem, and say what you want the garage to do."
  },

  {
    title: "Request Training at Work",
    prompt: "You would like to attend a training course related to your job. Write a letter to your manager. In your letter, explain which course you want to take, say how it will benefit your work, and ask for permission to attend."
  },

  {
    title: "Suggest a Community Class",
    prompt: "Your community center is asking for ideas for new classes. Write a letter to the center manager. In your letter, suggest a class, explain why people would be interested in it, and describe how it could be organized."
  },

  {
    title: "Thank a Host After Staying With Them",
    prompt: "You recently stayed at a friend's house while visiting another city. Write a letter to your friend. In your letter, thank them for hosting you, describe what you enjoyed during your stay, and invite them to visit you in return."
  },

  {
    title: "Report a Lost Wallet",
    prompt: "You lost your wallet in a public place. Write a letter to the manager of that place. In your letter, describe your wallet, explain when and where you lost it, and ask whether anyone has handed it in."
  },

  {
    title: "Offer to Help a Friend Move",
    prompt: "Your friend is moving to a new home, and you would like to help. Write a letter to your friend. In your letter, offer your help, explain what you can do, and ask when they need assistance."
  },

  {
    title: "Complain About Parking Problems",
    prompt: "There are parking problems in your residential area. Write a letter to your local council. In your letter, describe the parking situation, explain how it affects residents, and suggest possible solutions."
  },

  {
    title: "Make a Suggestion to Your Manager",
    prompt: "You have an idea that could improve your workplace. Write a letter to your manager. In your letter, describe your idea, explain how it would benefit the company, and suggest how it could be introduced."
  },

  {
    title: "Give Feedback About a Course",
    prompt: "You recently completed a course and want to give feedback. Write a letter to the course organizer. In your letter, describe the course, explain what you found useful, and suggest one improvement."
  },

  {
    title: "Book a Guided Tour",
    prompt: "You are planning to visit a city and want to book a guided tour. Write a letter to the tour company. In your letter, explain when you will visit, say what kind of tour you are interested in, and ask about prices and availability."
  },

  {
    title: "Ask About Joining a Sports Club",
    prompt: "You want to join a local sports club. Write a letter to the club manager. In your letter, introduce yourself, explain which sport you are interested in, and ask about membership fees and training times."
  },

  {
    title: "Advertise a Local Event",
    prompt: "You are organizing a local event and want to invite people in your community. Write a letter or notice to local residents. In your message, explain what the event is, give details about the time and place, and encourage people to attend."
  },

  {
    title: "Request New Equipment at Work",
    prompt: "The equipment you use at work is old and causing problems. Write a letter to your manager. In your letter, describe the equipment, explain the problems it causes, and request new or improved equipment."
  }

];
