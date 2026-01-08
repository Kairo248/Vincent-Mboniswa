'use client';

import Section from '@/app/components/ui/Section';
import Heading from '@/app/components/ui/Heading';
import SlideUp from '@/app/components/animation/SlideUp';
import EventCard from '@/app/components/cards/EventCard';
import { events } from '@/app/lib/data';

export default function EventsPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
  const pastEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < today;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <Section fullHeight variant="gradient">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <Heading level={1} size="2xl" variant="gold" align="center" className="mb-6">
              Events & Services
            </Heading>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
              Join us for powerful worship services, conferences, and ministry events
            </p>
          </SlideUp>
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section id="upcoming">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <Heading level={2} size="xl" variant="gold" className="mb-12">
              Upcoming Events
            </Heading>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-white/60 text-lg">
                  No upcoming events scheduled. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <Section id="past" variant="dark">
          <div className="max-w-7xl mx-auto">
            <SlideUp>
              <Heading level={2} size="xl" variant="gold" className="mb-12">
                Past Events
              </Heading>
            </SlideUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {pastEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>
        </Section>
      )}
    </main>
  );
}

