import ReactMarkdown from "react-markdown";
import styles from "../styles/styles";

const FALLBACK_TEAM = [
  {
    id: "asher-compton",
    name: "Asher Compton",
    role: "Founder and Director",
    member_group: "Leadership",
    bio: "Asher provides the vision and organizational foundation for From One to the Next, developing new ways for the publication to grow while remaining faithful to its mission.",
    image_url: "",
    display_order: 1,
    is_visible: true,
  },
  {
    id: "andrew-smyth",
    name: "Andrew Smyth",
    role: "Site Optimization",
    member_group: "Department Heads",
    bio: "Andrew leads the development and improvement of the website, creating an accessible, professional, and engaging reading experience across desktop and mobile.",
    image_url: "",
    display_order: 1,
    is_visible: true,
  },
  {
    id: "rock-tibayan",
    name: "Rock Tibayan",
    role: "Socials and Media",
    member_group: "Department Heads",
    bio: "Rock leads the publication’s social media presence and develops ways to communicate its identity, purpose, and mission across digital platforms.",
    image_url: "",
    display_order: 2,
    is_visible: true,
  },
  {
    id: "seth-damsgard",
    name: "Seth Damsgard",
    role: "Contributor Outreach",
    member_group: "Department Heads",
    bio: "Seth builds relationships with regular and occasional contributors, helping the publication feature a meaningful variety of topics, perspectives, and personalities.",
    image_url: "",
    display_order: 3,
    is_visible: true,
  },
  {
    id: "titus-ballewske",
    name: "Titus Ballewske",
    role: "Cultural Engagement and Interaction",
    member_group: "Department Heads",
    bio: "Titus guides writing that engages film, music, literature, art, and other cultural topics relevant to Christian young adults.",
    image_url: "",
    display_order: 4,
    is_visible: true,
  },
  {
    id: "jonah-kalsnes",
    name: "Jonah Kalsnes",
    role: "Editing and Publishing",
    member_group: "Department Heads",
    bio: "Jonah develops the publication’s editorial standards and helps prepare new pieces for publication while contributing writing of his own.",
    image_url: "",
    display_order: 5,
    is_visible: true,
  },
];

const GROUP_ORDER = [
  "Leadership",
  "Department Heads",
  "Board Members",
  "Advisors",
];

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AboutPage({
  content,
  teamMembers = [],
  isAdmin = false,
  onEditTeamMember,
  onAddTeamMember,
}) {
  const displayedTeam = (
    teamMembers.length > 0 ? teamMembers : FALLBACK_TEAM
  )
    .filter((member) => member.is_visible !== false)
    .sort((a, b) => {
      const groupDifference =
        GROUP_ORDER.indexOf(a.member_group) -
        GROUP_ORDER.indexOf(b.member_group);

      if (groupDifference !== 0) {
        return groupDifference;
      }

      return (
        (a.display_order || 0) -
        (b.display_order || 0)
      );
    });

  const groupedTeam = GROUP_ORDER.map((group) => ({
    group,
    members: displayedTeam.filter(
      (member) => member.member_group === group
    ),
  })).filter(({ members }) => members.length > 0);

  function scrollToSubscribe() {
    document.getElementById("subscribe")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <article style={styles.aboutPage}>
      <section
        className="about-hero-grid"
        style={styles.aboutHero}
      >
        <div>
          <p style={styles.aboutEyebrow}>
            About From One to the Next
          </p>

          <h1 style={styles.aboutHeroTitle}>
            Christian young adults helping one another
            follow Jesus in everyday life.
          </h1>
        </div>

        <div style={styles.aboutHeroCopy}>
          <p>
            From One to the Next is a publishing and media
            organization created by Christian young adults
            for Christian young adults.
          </p>

          <p>
            We bring together thoughtful voices that engage
            faith, culture, and the questions shaping our
            generation.
          </p>
        </div>
      </section>

      <section style={styles.aboutPurposeSection}>
        <p style={styles.aboutEyebrow}>Why we exist</p>

        <h2 style={styles.aboutSectionTitle}>
          Faith should shape more than what we believe.
        </h2>

        <div style={styles.aboutPurposeCopy}>
          <p>
            It should shape how we live, what we create, how
            we engage with culture, and how we serve the
            people around us.
          </p>

          <p>
            From One to the Next exists to equip Christian
            young adults to become passionate followers of
            Christ who are prepared to live and share the
            Gospel in everyday life.
          </p>
        </div>
      </section>

      <section
        className="about-principles-grid"
        style={styles.aboutPrinciplesGrid}
      >
        <div style={styles.aboutPrinciple}>
          <p style={styles.aboutPrincipleNumber}>01</p>
          <h2 style={styles.aboutPrincipleTitle}>
            Who we are
          </h2>
          <p style={styles.aboutPrincipleText}>
            A publishing and media organization run and
            hosted by Christian young adults, created to
            spread the Gospel by equipping others in our
            generation.
          </p>
        </div>

        <div style={styles.aboutPrinciple}>
          <p style={styles.aboutPrincipleNumber}>02</p>
          <h2 style={styles.aboutPrincipleTitle}>
            Why we are here
          </h2>
          <p style={styles.aboutPrincipleText}>
            To encourage Christian young adults to grow in
            faith, pursue Christ passionately, and help
            transform the people and communities around
            them.
          </p>
        </div>

        <div style={styles.aboutPrinciple}>
          <p style={styles.aboutPrincipleNumber}>03</p>
          <h2 style={styles.aboutPrincipleTitle}>
            What we do
          </h2>
          <p style={styles.aboutPrincipleText}>
            We publish voices addressing the everyday
            questions, ideas, and cultural conversations
            shaping the lives of Christian young adults.
          </p>
        </div>
      </section>

      <section style={styles.aboutWritingSection}>
        <p style={styles.aboutEyebrow}>
          What readers will find
        </p>

        <h2 style={styles.aboutSectionTitle}>
          Writing rooted in faith and engaged with real life.
        </h2>

        <div
          className="about-values-grid"
          style={styles.aboutValuesGrid}
        >
          <div style={styles.aboutValue}>
            <h3 style={styles.aboutValueTitle}>
              Faith and everyday life
            </h3>
            <p style={styles.aboutValueText}>
              Personal reflections, practical encouragement,
              and conversations about following Jesus daily.
            </p>
          </div>

          <div style={styles.aboutValue}>
            <h3 style={styles.aboutValueTitle}>
              Culture and ideas
            </h3>
            <p style={styles.aboutValueText}>
              Christian engagement with the questions,
              movements, and ideas shaping our generation.
            </p>
          </div>

          <div style={styles.aboutValue}>
            <h3 style={styles.aboutValueTitle}>
              Film, books, music, and art
            </h3>
            <p style={styles.aboutValueText}>
              Thoughtful interaction with the stories and
              creative work influencing how we see the world.
            </p>
          </div>

          <div style={styles.aboutValue}>
            <h3 style={styles.aboutValueTitle}>
              Community voices
            </h3>
            <p style={styles.aboutValueText}>
              Different experiences and perspectives united
              by faith in Christ and a desire to follow him.
            </p>
          </div>
        </div>
      </section>

      {content?.trim() && (
        <section style={styles.aboutStorySection}>
          <p style={styles.aboutEyebrow}>
            From our team
          </p>

          <div
            className="about-markdown"
            style={styles.aboutStoryContent}
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </section>
      )}

      <section style={styles.aboutTeamSection}>
        <div style={styles.aboutTeamHeader}>
          <div>
            <p style={styles.aboutEyebrow}>
              Meet the team
            </p>

            <h2 style={styles.aboutSectionTitle}>
              Built by young adults who believe this work
              matters.
            </h2>
          </div>

          {isAdmin && onAddTeamMember && (
            <button
              type="button"
              style={styles.aboutAdminButton}
              onClick={onAddTeamMember}
            >
              + Add person
            </button>
          )}
        </div>

        {groupedTeam.map(({ group, members }) => (
          <section
            key={group}
            style={styles.aboutTeamGroup}
          >
            <h3 style={styles.aboutTeamGroupTitle}>
              {group}
            </h3>

            <div
              className="about-team-grid"
              style={styles.aboutTeamGrid}
            >
              {members.map((member) => (
                <article
                  key={member.id || member.slug}
                  className="about-team-card"
                  style={styles.aboutTeamCard}
                >
                  {member.image_url ? (
                    <img
                      className="about-team-image"
                      src={member.image_url}
                      alt={member.name}
                      style={styles.aboutTeamImage}
                    />
                  ) : (
                    <div
                      className="about-team-placeholder"
                      style={styles.aboutTeamPlaceholder}
                      aria-label={`${member.name} portrait placeholder`}
                    >
                      {getInitials(member.name)}
                    </div>
                  )}

                  <div
                    className="about-team-card-body"
                    style={styles.aboutTeamCardBody}
                  >
                    <p style={styles.aboutTeamRole}>
                      {member.role}
                    </p>

                    <h3
                      className="about-team-name"
                      style={styles.aboutTeamName}
                    >
                      {member.name}
                    </h3>

                    <p
                      className="about-team-bio"
                      style={styles.aboutTeamBio}
                    >
                      {member.bio}
                    </p>

                    {isAdmin && onEditTeamMember && (
                      <button
                        type="button"
                        style={styles.aboutEditButton}
                        onClick={() =>
                          onEditTeamMember(member)
                        }
                      >
                        Edit profile
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section style={styles.aboutClosingSection}>
        <p style={styles.aboutClosingEyebrow}>
          From one voice to the next
        </p>

        <h2 style={styles.aboutClosingTitle}>
          Read thoughtfully. Follow Christ faithfully.
          Pass it on.
        </h2>

        <p style={styles.aboutClosingText}>
          Explore writing from Christian young adults and
          join a growing conversation about faith, culture,
          and everyday life.
        </p>

        <div
          className="about-cta-actions"
          style={styles.aboutClosingActions}
        >
          <a
            href="/?category=Home"
            style={styles.aboutPrimaryLink}
          >
            Explore articles
          </a>

          <button
            type="button"
            style={styles.aboutSecondaryButton}
            onClick={scrollToSubscribe}
          >
            Subscribe
          </button>
        </div>
      </section>
    </article>
  );
}