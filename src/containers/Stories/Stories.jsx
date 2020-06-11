import React, { useState } from "react";

import Story from '../../components/Story';

import './Stories.scss';

const Stories = ({ stories, getUserHandler }) => {
  const [showStory, toggleShowStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState({});
  const [selectedUser, setSelectedUser] = useState({});

  const findStoryById = (id) => stories.find(story => story.id === id);

  const handleStory = (story) => {
    const foundStory = findStoryById(story.id);
    const user = getUserHandler(story.userId);

    setSelectedUser(user);
    setSelectedStory(foundStory);
    toggleShowStory(!showStory);
  };

  return (
    <React.Fragment>
      <section className="stories" data-testid="stories">
        <div className="container">
          {stories.map((story, index) => {
            const profile = getUserHandler(story.userId);

            return (
              <button
                key={story.id}
                onClick={() => handleStory(story)}
                className={`user__thumb ${index === 0 && 'user__thumb--hasNew'}`}
              >
                <div className="user__thumb__wrapper">
                  <img src={profile.avatar} alt={profile.name} />
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {showStory && (
        <Story 
          story={selectedStory}
          user={selectedUser}
          handleClose={() => toggleShowStory(!showStory)}
        />
      )}
    </React.Fragment>
  );
};

export default Stories;
