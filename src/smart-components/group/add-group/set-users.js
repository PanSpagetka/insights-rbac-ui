import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, FormGroup, Stack, StackItem, TextContent } from '@patternfly/react-core';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/esm/use-field-api';
import useFormApi from '@data-driven-forms/react-form-renderer/dist/esm/use-form-api';
import { CompactUsersList } from './users-list';
import ActiveUser from '../../../presentational-components/shared/ActiveUsers';
import '../../../App.scss';

const SetUsers = (props) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { input } = useFieldApi(props);
  const formOptions = useFormApi();

  useEffect(() => {
    setSelectedUsers(formOptions.getState().values['users-list'] || []);
  }, []);

  useEffect(() => {
    input.onChange(selectedUsers);
    formOptions.change('users-list', selectedUsers);
  }, [selectedUsers]);

  return (
    <Fragment>
      <Form>
        <Stack hasGutter>
          <StackItem>
            <TextContent>
              <ActiveUser description={'These are all of the users in your Red Hat organization. To manage users, go to your'} />
            </TextContent>
          </StackItem>
          <StackItem>
            <FormGroup fieldId="select-user">
              <Card>
                <CompactUsersList selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
              </Card>
            </FormGroup>
          </StackItem>
        </Stack>
      </Form>
    </Fragment>
  );
};

SetUsers.propTypes = {
  selectedUsers: PropTypes.array,
  setSelectedUsers: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SetUsers;
