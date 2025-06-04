require 'rails_helper'

RSpec.describe "Api::V1::Events", type: :request do
  let(:user) { create(:user) }
  let(:headers) { { 'Authorization' => "Bearer #{JsonWebToken.encode(user_id: user.id)}" } } # Assuming you have JWT configured

  describe "GET /api/v1/events" do
    context "when authenticated" do
      it "returns a success response" do
        get api_v1_events_path, headers: headers
        expect(response).to be_successful
      end
    end

    context "when not authenticated" do
      it "returns an unauthorized response" do
        get api_v1_events_path
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET /api/v1/events/:id" do
    let!(:event) { create(:event, user: user) }

    context "when authenticated" do
      it "returns a success response" do
        get api_v1_event_path(event), headers: headers
        expect(response).to be_successful
      end

      it "does not return other user's event" do
        other_user = create(:user)
        other_event = create(:event, user: other_user)
        get api_v1_event_path(other_event), headers: headers
        expect(response).to have_http_status(:not_found)
      end
    end

    context "when not authenticated" do
      it "returns an unauthorized response" do
        get api_v1_event_path(event)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /api/v1/events" do
    let(:valid_attributes) { { title: "New Event", start_time: DateTime.now, end_time: DateTime.now + 1.hour } }
    let(:invalid_attributes) { { title: "", start_time: DateTime.now, end_time: DateTime.now + 1.hour } }


    context "when authenticated" do
      context "with valid parameters" do
        it "creates a new Event" do
          expect {
            post api_v1_events_path, params: { event: valid_attributes }, headers: headers
          }.to change(Event, :count).by(1)
          expect(response).to have_http_status(:created)
        end
      end

      context "with invalid parameters" do
        it "does not create a new Event" do
          expect {
            post api_v1_events_path, params: { event: invalid_attributes }, headers: headers
          }.to change(Event, :count).by(0)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "when not authenticated" do
      it "returns an unauthorized response" do
        post api_v1_events_path, params: { event: valid_attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "PATCH /api/v1/events/:id" do
    let!(:event) { create(:event, user: user) }
    let(:new_attributes) { { title: "Updated Event Title" } }

    context "when authenticated" do
      it "updates the requested event" do
        patch api_v1_event_path(event), params: { event: new_attributes }, headers: headers
        event.reload
        expect(event.title).to eq("Updated Event Title")
        expect(response).to be_successful
      end

      it "does not update other user's event" do
        other_user = create(:user)
        other_event = create(:event, user: other_user)
        patch api_v1_event_path(other_event), params: { event: new_attributes }, headers: headers
        expect(response).to have_http_status(:not_found)
      end


      context "with invalid parameters" do
        let(:invalid_attributes) { { title: "" } } # Example of invalid attribute
        it "does not update the event" do
          patch api_v1_event_path(event), params: { event: invalid_attributes }, headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "when not authenticated" do
      it "returns an unauthorized response" do
        patch api_v1_event_path(event), params: { event: new_attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "DELETE /api/v1/events/:id" do
    let!(:event) { create(:event, user: user) }

    context "when authenticated" do
      it "destroys the requested event" do
        expect {
          delete api_v1_event_path(event), headers: headers
        }.to change(Event, :count).by(-1)
        expect(response).to have_http_status(:no_content)
      end

      it "does not destroy other user's event" do
        other_user = create(:user)
        other_event = create(:event, user: other_user)
        expect {
          delete api_v1_event_path(other_event), headers: headers
        }.to change(Event, :count).by(0)
        expect(response).to have_http_status(:not_found)
      end
    end

    context "when not authenticated" do
      it "returns an unauthorized response" do
        delete api_v1_event_path(event)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
