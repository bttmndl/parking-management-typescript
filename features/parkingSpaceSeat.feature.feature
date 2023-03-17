Feature: Parking Space Seat

  Scenario: Booking a parking seat
    Given I am on the parking space seat page
    When I enter the vehicle details
    And I select a parking seat
    And I submit the form
    Then the parking seat should be booked

  Scenario: Deallocating a parking seat
    Given I am on the parking space seat page
    When I select a booked parking seat
    Then the parking seat should be deallocated
