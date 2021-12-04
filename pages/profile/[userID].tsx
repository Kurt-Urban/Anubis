import React, { useEffect } from "react";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Card, Col, Row } from "reactstrap";
import { useMutation } from "@apollo/client";
import { deleteServerMutation } from "@/mutations";

const UserProfile: React.FC = ({}) => {
  const { user } = useUser();
  const history = useRouter();

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const servers = user?.servers || [];

  const [deleteServer] = useMutation(deleteServerMutation);

  return (
    <>
      <Row className="mx-2 mt-4">
        <Col xs={4}>
          <Card className="bg-800 border-700 shadow p-3">
            <Row>
              <Col xs={10}>
                <div className="h2">
                  {user?.firstName} {user?.lastName}
                </div>
              </Col>
              <Col>{user?.id}</Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;
