---
title: Step towards DIGITAL TWIN using Actor Model based Micro services
date: 2017-11-13
author: Chittapriya Mondal
---

# Introduction

<p align="center">
  <img src="/blog/digital-twin-actor-model/dtacm-mirror.jpg" alt="Digital Twin Actor Model" />
</p>

*Digital Twin is a digital representation of physical objects like device, process or system. In IoT world, digital twin can help us monitoring entire life cycle of devices. AI and Machine Learning modules can be integrated with digital simulation. Digital twin needs to be updated frequently so that it maintains same copy of physical object’s properties and state. 3D modeling and Augmented reality can be used to enable visualization with respect to creation and monitoring of Digital Twins.*

In this topic, let us see how Digital Twin, Actor Pattern and Azure Fabric can be useful.

In today’s world, Micro service based architecture has decent impact on business. Businesses needs to be true agile on whatever they are doing — it could be Development, Efficient/Faster deployment, Effective maintenance and so on…Traditional architectures are good on separation of layers but they are very difficult to scale and maintain. To meet the above needs, micro service based architecture splits entire systems into small and independent services.

Stateless services need to maintain state in a separate persistence store. In the Modern computing world, it is always better to keep the compute and store together. Stateful services are useful in this context.

Azure service fabric is a micro services platform to build scalable and reliable micro services. This is a PaaS offering from Microsoft. It supports container based apps, Stateless service, Stateful service and Actor service.  For more information refer [Azure Service Fabric](https://learn.microsoft.com/en-in/azure/service-fabric/service-fabric-overview)

