# 📡 Project Beacons — Integration with EventRevolution

> **Source of truth:** [`EventRevolution/docs/PROJECT_BEACONS.md`](https://github.com/bytewizard42i/DIDzMonolith/blob/main/EventRevolution/docs/PROJECT_BEACONS.md) — read that first.
>
> **Inspiration video:** [Beacon Technology — Using Beacons in Proximity Marketing](https://youtu.be/2YorsgulwdU?si=UNPxybBfCewfBZnV).
>
> **Why this matters to DiscoveryManagement:** the physical Project Beacons that EventRevolution puts on every conference booth are the **on-the-ground sensor layer** of the same project-discovery primitive that DM provides at the protocol layer.

---

## The 30-second pitch

EventRevolution gives every project at a convention its **own BLE beacon** that broadcasts a URL (`https://er.app/p/<slug>`). Attendees' phones harvest these URLs in the background, fetch a project card, and the on-device AI ranks projects by relevance to the attendee's interests — **including the night before the event from a hotel room**, because the directory is replicated to the cloud the moment a project registers.

This is the **physical complement** to DiscoveryManagement's protocol-layer project registry: DM declares *"these are the projects in the ecosystem and how to find them"*; EventRevolution Project Beacons declare *"this project is here right now, 5 m from the attendee, broadcasting its own URL."*

---

## Where DiscoveryManagement plugs in

| EventRevolution role | DiscoveryManagement role |
|---|---|
| Defines the BLE-tag spec, UUID/Major/Minor scheme, and per-event beacon allocation | Defines the **canonical project registry** that the per-event allocations resolve to |
| Hosts the `er.app/p/<slug>` URL shortener for one event at a time | Hosts the **persistent slug-to-project mapping** across events |
| Computes booth-popularity metrics (Tier 0 anonymous) at the event | Computes **cross-event project-popularity reputation** that travels with the project |
| AI agent ranks projects against attendee's interest profile during one event | DM's project metadata (tags, category, funding stage, hiring status) **feeds the relevance ranker** so projects get ranked the same way at every event they appear at |

---

## Recommended integration shape

1. **Project registers in DiscoveryManagement** with a stable `projectId`, slug, tags, and metadata.
2. When an event organizer wants Project X at their conference, they request a **per-event beacon allocation** from EventRevolution. ER assigns `iBeacon major=4, minor=N` for that event and configures the physical BC021/Minew tag.
3. The `er.app/p/<slug>` shortener resolves to a **DM-hosted project landing page** (or sponsor's URL of choice) with consistent branding/tags.
4. After the event, ER pushes **anonymized aggregate booth metrics** (visits, dwell, demo attendance) back to DM. DM credits the project's cross-event reputation score.
5. DM's API exposes a `getProject(slug)` endpoint that the EventRevolution app calls when harvesting URLs, ensuring consistent project-card rendering across all events.

---

## Open coordination items

- [ ] Define the `getProject(slug)` API contract (DM → ER pre-event sync)
- [ ] Define the `pushEventMetrics(projectId, eventId, aggregateData)` contract (ER → DM post-event)
- [ ] Reserve a slug-namespace policy: who arbitrates collisions when two unrelated projects want the same slug?
- [ ] Decide whether `er.app/p/<slug>` should redirect to a DM canonical URL or a sponsor-controlled one (probably: DM canonical with sponsor-controlled override flag)

---

*Maintained by Penny. Created May 5, 2026 from John's request to cross-pollinate Project Beacon technology across the DIDzMonolith subs. Update once the EventRevolution May 6 hardware unboxing has produced first measurements and the `er.app` shortener is live.*
