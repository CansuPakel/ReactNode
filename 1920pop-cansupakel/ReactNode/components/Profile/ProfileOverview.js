import { Header, Segment, Label, Container } from "semantic-ui-react";
function ProfileOverview({ role, email, firstname, lastname }) {
  return (
    <Segment color="olive" inverted>
      <Header as="h2" textAlign="center">
        {firstname} {lastname}
        <Header.Subheader>{email}</Header.Subheader>
      </Header>
    </Segment>
  );
}
export default ProfileOverview;
